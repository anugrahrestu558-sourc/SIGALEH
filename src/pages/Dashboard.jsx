import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import PriceChart from "../components/PriceChart";
import SkeletonCard from "../components/SkeletonCard";
import useDashboard from "../hooks/useDashboard";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EarlyWarningCard from "../components/EarlyWarningCard";

/**
 * 🔥 NEW IMPORTS (UPGRADE)
 */
import useDataMode from "../hooks/useDataMode";
import useMarketSimulator from "../hooks/useMarketSimulator";

function Dashboard() {
  const [selectedCommodity, setSelectedCommodity] = useState("Cabai Merah");
  const [selectedCity, setSelectedCity] = useState("Padang");

  /**
   * =========================
   * MODE SYSTEM (NEW)
   * =========================
   */
  const { mode, setMode } = useDataMode();

  const {
    data,
    loading: apiLoading,
    error,
  } = useDashboard(selectedCommodity, selectedCity);

  /**
   * =========================
   * SIMULATOR DATA
   * =========================
   */
  const simData = useMarketSimulator(45000, 1500);

  /**
   * =========================
   * SAFE DATA
   * =========================
   */
  const safeData = data || {};

  const apiChart =
    safeData?.charts?.historical?.length > 0
      ? safeData.charts.historical
      : [];

  /**
   * =========================
   * SMART DATA SWITCHER (CORE FEATURE)
   * =========================
   */
  const chartData =
    mode === "MOCK"
      ? apiChart.length > 0
        ? apiChart
        : generateMockChart()
      : mode === "SIM"
      ? simData
      : apiChart;

  return (
    <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Prediksi Harga Pangan
            </h1>
            <p className="text-slate-400 mt-2">
              Smart AI Food Monitoring System
            </p>
          </div>

          <div className="text-right">
            <p className="text-green-400 font-semibold">
              ● AI Online
            </p>
            <p className="text-slate-400 text-sm">
              {new Date().toLocaleTimeString()}
            </p>
          </div>

        </div>

        {/* =========================
            MODE SWITCHER (NEW UI)
        ========================= */}
        <div className="flex gap-2 mb-6">

          <button
            onClick={() => setMode("MOCK")}
            className={`px-3 py-1 rounded-lg text-sm ${
              mode === "MOCK"
                ? "bg-yellow-500 text-black"
                : "bg-white/10"
            }`}
          >
            MOCK
          </button>

          <button
            onClick={() => setMode("API")}
            className={`px-3 py-1 rounded-lg text-sm ${
              mode === "API"
                ? "bg-green-500 text-black"
                : "bg-white/10"
            }`}
          >
            API
          </button>

          <button
            onClick={() => setMode("SIM")}
            className={`px-3 py-1 rounded-lg text-sm ${
              mode === "SIM"
                ? "bg-blue-500 text-black"
                : "bg-white/10"
            }`}
          >
            SIM
          </button>

          <span className="text-xs text-slate-400 ml-3 self-center">
            Mode: {mode}
          </span>

        </div>

        {/* EARLY WARNING */}
        <EarlyWarningCard metrics={safeData?.metrics} />

        {/* FILTER */}
        <FilterBar
          selectedCommodity={selectedCommodity}
          setSelectedCommodity={setSelectedCommodity}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {apiLoading && mode === "API" ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatCard
                title="Harga Terakhir"
                value={`Rp ${Number(
                  safeData?.metrics?.harga_terakhir || 0
                ).toLocaleString("id-ID")}`}
                status={safeData?.early_warning?.status || "AMAN"}
                change={safeData?.metrics?.delta_harian_pct || 0}
              />

              <StatCard
                title="Perubahan Mingguan"
                value={`${Number(
                  safeData?.metrics?.delta_mingguan_pct || 0
                ).toFixed(2)}%`}
                status={safeData?.early_warning?.status || "AMAN"}
                change={safeData?.metrics?.delta_mingguan_pct || 0}
              />

              <StatCard
                title="Rata-rata 30 Hari"
                value={`Rp ${Number(
                  safeData?.metrics?.rata_rata_30_hari || 0
                ).toLocaleString("id-ID")}`}
                status="Stabil"
                change={0}
              />

              <StatCard
                title="MAPE Model"
                value={`${Number(
                  safeData?.evaluation?.mape || 0
                ).toFixed(2)}%`}
                status="Aman"
                change={0}
              />
            </>
          )}
        </div>

        {/* CHART */}
        <div className="mb-8">
          <PriceChart
            city={selectedCity}
            commodity={selectedCommodity}
            chartData={chartData}
            loading={apiLoading && mode === "API"}
            error={error}
            evaluation={safeData?.evaluation}
            early_warning={safeData?.early_warning}
            realtime={mode === "SIM"}   // 🔥 penting
          />
        </div>

        {/* AI INSIGHT */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            AI Insight
          </h2>

          <div className="space-y-4">

            <div className="bg-red-500/20 border border-red-500/20 rounded-2xl p-4">
              <p className="text-red-300 font-medium">
                Prediksi harga cabai naik 12% minggu depan
              </p>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/20 rounded-2xl p-4">
              <p className="text-yellow-300 font-medium">
                Bukittinggi memasuki status waspada pangan
              </p>
            </div>

            <div className="bg-green-500/20 border border-green-500/20 rounded-2xl p-4">
              <p className="text-green-300 font-medium">
                Confidence model AI mencapai 89%
              </p>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

/**
 * =========================
 * MOCK FALLBACK (NEW)
 * =========================
 */
function generateMockChart() {
  return [
    { day: "Sen", actual: 30000, prediction: 30500 },
    { day: "Sel", actual: 32000, prediction: 32500 },
    { day: "Rab", actual: 31000, prediction: 31500 },
    { day: "Kam", actual: 34000, prediction: 34500 },
    { day: "Jum", actual: 36000, prediction: 36500 },
  ];
}

export default Dashboard;