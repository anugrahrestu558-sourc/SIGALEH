import {
  LineChart,
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

import { TrendingUp, BrainCircuit, Activity } from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import useMarketSimulator from "../hooks/useMarketSimulator";

function PriceChart({
  city,
  commodity,
  chartData,
  loading = false,
  error = null,
  evaluation,
  early_warning,
  realtime = false, // 🔥 NEW: toggle simulator
}) {
  /**
   * =========================
   * DATA SOURCE SWITCH
   * =========================
   */
  const liveData = useMarketSimulator(45000, 1500);

  const safeChartData =
    realtime
      ? liveData
      : Array.isArray(chartData) && chartData.length > 0
        ? chartData
        : generateFallbackChart();

  const last = safeChartData[safeChartData.length - 1] || {};
  const first = safeChartData[0] || {};

  const trend = last.actual > first.actual ? "UP" : "DOWN";
  const volatility = calculateVolatility(safeChartData);

  return (
    <div className="bg-[#0b1220] border border-white/10 p-6 rounded-3xl shadow-2xl mt-8">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">

        <div>
          <h2 className="text-xl font-bold text-white">
            MARKET ANALYTICS
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            {commodity || "-"} • {city || "-"}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10">
          <Activity size={14} className="text-green-400" />
          <span className="text-green-400 text-xs">
            {realtime ? "LIVE SIMULATION" : "STATIC MODE"}
          </span>
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-400 text-sm mb-3">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <SkeletonCard className="h-[320px]" />
      ) : (
        <>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <MiniCard
              label="Market Trend"
              value={trend}
              color={trend === "UP" ? "green" : "red"}
            />

            <MiniCard
              label="Volatility"
              value={`${volatility}%`}
              color="yellow"
            />

            <MiniCard
              label="AI Confidence"
              value={`${evaluation?.da ?? 89}%`}
              color="blue"
            />

          </div>

          {/* LAST PRICE */}
          <div className="mb-3 text-xs text-slate-400">
            Last Price:
            <span className="text-white font-semibold ml-2">
              {last.actual?.toLocaleString?.("id-ID") || "-"}
            </span>
          </div>

          {/* CHART */}
          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={safeChartData}>

                <defs>
                  <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" opacity={0.3} />

                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />

                <Tooltip content={<TradingTooltip />} />
                <Legend />

                {/* AVG LINE */}
                <ReferenceLine
                  y={average(safeChartData)}
                  stroke="#64748b"
                  strokeDasharray="3 3"
                  label="AVG"
                />

                {/* ACTUAL */}
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#22c55e"
                  fill="url(#greenFill)"
                  strokeWidth={2}
                  name="Actual Price"
                />

                {/* PREDICTION */}
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  dot={false}
                  name="AI Prediction"
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
 * =========================
 * MINI CARD
 * =========================
 */
function MiniCard({ label, value, color }) {
  const colors = {
    green: "text-green-400 border-green-500/20 bg-green-500/10",
    red: "text-red-400 border-red-500/20 bg-red-500/10",
    blue: "text-sky-400 border-sky-500/20 bg-sky-500/10",
    yellow: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
  };

  return (
    <div className={`p-4 rounded-2xl border ${colors[color]}`}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

/**
 * =========================
 * TOOLTIP
 * =========================
 */
function TradingTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#0f172a] border border-white/10 p-3 rounded-xl">
      <p className="text-slate-400 text-xs mb-2">{label}</p>

      {payload.map((p, i) => (
        <p key={i} className="text-sm text-white">
          {p.name}:{" "}
          <span className="font-bold">
            {p.value?.toLocaleString?.("id-ID")}
          </span>
        </p>
      ))}
    </div>
  );
}

/**
 * =========================
 * HELPERS
 * =========================
 */
function average(data) {
  const sum = data.reduce((a, b) => a + (b.actual || 0), 0);
  return sum / data.length;
}

function calculateVolatility(data) {
  const values = data.map(d => d.actual || 0);
  const max = Math.max(...values);
  const min = Math.min(...values);

  if (min === 0) return 0;

  return (((max - min) / min) * 100).toFixed(2);
}

/**
 * =========================
 * FALLBACK
 * =========================
 */
function generateFallbackChart() {
  return [
    { day: "Sen", actual: 30000, prediction: 30500 },
    { day: "Sel", actual: 32000, prediction: 32500 },
    { day: "Rab", actual: 31000, prediction: 31500 },
    { day: "Kam", actual: 34000, prediction: 34500 },
    { day: "Jum", actual: 36000, prediction: 36500 },
    { day: "Sab", actual: 38000, prediction: 38500 },
    { day: "Min", actual: 40000, prediction: 40500 },
  ];
}

export default PriceChart;