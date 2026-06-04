import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

import { Activity } from "lucide-react";
import SkeletonCard from "./SkeletonCard";

function PriceChart({
  city,
  commodity,
  chartData,
  loading = false,
  error = null,
  evaluation,
  realtime = false,
}) {
  /**
   * =========================
   * LIMIT DATA
   * =========================
   */
  const safeChartData =
    Array.isArray(chartData) && chartData.length > 0
      ? chartData.slice(-90)
      : generateFallbackChart();

  console.log(
    "Displayed Chart Data:",
    safeChartData
  );

  const last =
    safeChartData[safeChartData.length - 1] || {};

  const first =
    safeChartData[0] || {};

  const trend =
    last.actual > first.actual
      ? "UP"
      : "DOWN";

  const volatility =
    calculateVolatility(safeChartData);

  return (
    <div className="bg-[#0b1220] border border-white/10 p-6 rounded-3xl shadow-2xl mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">

        <div>
          <h2 className="text-xl font-bold text-white">
            MARKET ANALYTICS
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {commodity} • {city}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10">
          <Activity
            size={14}
            className="text-green-400"
          />

          <span className="text-green-400 text-xs">
            {realtime
              ? "LIVE SIMULATION"
              : "API DATA"}
          </span>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl mb-4">
          <p className="text-red-400 text-sm">
            {error}
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <SkeletonCard className="h-[450px]" />
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <MiniCard
              label="Market Trend"
              value={trend}
              color={
                trend === "UP"
                  ? "green"
                  : "red"
              }
            />

            <MiniCard
              label="Volatility"
              value={`${volatility}%`}
              color="yellow"
            />

            <MiniCard
              label="AI Confidence"
              value={`${evaluation?.da ?? 0}%`}
              color="blue"
            />

          </div>

          {/* LAST PRICE */}
          <div className="mb-4 text-sm text-slate-400">
            Harga Terakhir :
            <span className="text-white font-bold ml-2">
              Rp{" "}
              {Number(
                last.actual || 0
              ).toLocaleString("id-ID")}
            </span>
          </div>

          {/* CHART */}
          <div
            className="w-full"
            style={{
              height: "450px",
              minHeight: "450px",
            }}
          >
            <ResponsiveContainer
              width="100%"
              height={450}
            >
              <AreaChart
                data={safeChartData}
              >
                <defs>

                  <linearGradient
                    id="greenFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#22c55e"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="#22c55e"
                      stopOpacity={0}
                    />
                  </linearGradient>

                </defs>

                <CartesianGrid
                  stroke="#1f2937"
                  strokeDasharray="3 3"
                  opacity={0.3}
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                  minTickGap={30}
                />

                <YAxis
                  stroke="#94a3b8"
                  tickFormatter={(value) =>
                    `${Math.round(
                      value / 1000
                    )}k`
                  }
                />

                <Tooltip
                  content={<TradingTooltip />}
                />

                <Legend />

                <ReferenceLine
                  y={average(
                    safeChartData
                  )}
                  stroke="#64748b"
                  strokeDasharray="5 5"
                  label="AVG"
                />

                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#22c55e"
                  fill="url(#greenFill)"
                  strokeWidth={2}
                  dot={false}
                  name="Harga Aktual"
                />

                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  dot={false}
                  name="Prediksi AI"
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * MINI CARD
 */
function MiniCard({
  label,
  value,
  color,
}) {
  const colors = {
    green:
      "text-green-400 border-green-500/20 bg-green-500/10",
    red:
      "text-red-400 border-red-500/20 bg-red-500/10",
    blue:
      "text-sky-400 border-sky-500/20 bg-sky-500/10",
    yellow:
      "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  };

  return (
    <div
      className={`p-4 rounded-2xl border ${colors[color]}`}
    >
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

/**
 * TOOLTIP
 */
function TradingTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload?.length)
    return null;

  return (
    <div className="bg-[#0f172a] border border-white/10 p-3 rounded-xl">
      <p className="text-slate-400 text-xs mb-2">
        {label}
      </p>

      {payload.map((item, index) => (
        <p
          key={index}
          className="text-white text-sm"
        >
          {item.name}:{" "}
          <span className="font-bold">
            {Number(
              item.value || 0
            ).toLocaleString("id-ID")}
          </span>
        </p>
      ))}
    </div>
  );
}

/**
 * HELPERS
 */
function average(data) {
  if (!data.length) return 0;

  const sum = data.reduce(
    (acc, item) =>
      acc + (item.actual || 0),
    0
  );

  return sum / data.length;
}

function calculateVolatility(data) {
  if (!data.length) return 0;

  const values = data.map(
    (d) => d.actual || 0
  );

  const max = Math.max(...values);
  const min = Math.min(...values);

  if (min === 0) return 0;

  return (
    ((max - min) / min) *
    100
  ).toFixed(2);
}

function generateFallbackChart() {
  return [
    {
      day: "Sen",
      actual: 30000,
      prediction: 30500,
    },
    {
      day: "Sel",
      actual: 32000,
      prediction: 32500,
    },
    {
      day: "Rab",
      actual: 31000,
      prediction: 31500,
    },
    {
      day: "Kam",
      actual: 34000,
      prediction: 34500,
    },
    {
      day: "Jum",
      actual: 36000,
      prediction: 36500,
    },
    {
      day: "Sab",
      actual: 38000,
      prediction: 38500,
    },
    {
      day: "Min",
      actual: 40000,
      prediction: 40500,
    },
  ];
}

export default PriceChart;