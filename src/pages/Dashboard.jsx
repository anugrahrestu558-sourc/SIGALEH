import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import PriceChart from "../components/PriceChart";
import SkeletonCard from "../components/SkeletonCard";
import useDashboard from "../hooks/useDashboard";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import EarlyWarningCard from "../components/EarlyWarningCard";
import DataTable from "../components/DataTable";

import useMarketSimulator from "../hooks/useMarketSimulator";

function Dashboard() {
  const [selectedCommodity, setSelectedCommodity] = useState("Cabai Merah");
  const [selectedCity, setSelectedCity] = useState("Padang");
  const [mode, setMode] = useState("API");

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

  /**
   * =========================
   * CHART DATA (API)
   * =========================
   */
  const apiChart =
    safeData?.charts?.historical?.length > 0
      ? safeData.charts.historical.map((item) => ({
          day: new Date(item.tanggal).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
          }),
          actual: item.harga_actual,
          prediction: item.harga_prediksi,
        }))
      : [];

  /**
   * =========================
   * SMART SWITCHER
   * =========================
   */
  const chartData = mode === "SIM" ? simData : apiChart;

  /**
   * =========================
   * TABLE DATA (NEW 🔥)
   * =========================
   */
  const tableData =
    safeData?.table || safeData?.data || safeData?.historical || [];

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
            <p className="text-green-400 font-semibold">● AI Online</p>
            <p className="text-slate-400 text-sm">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* MODE SWITCHER */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("API")}
            className={`px-3 py-1 rounded-lg text-sm ${
              mode === "API" ? "bg-green-500 text-black" : "bg-white/10"
            }`}
          >
            API
          </button>

          <button
            onClick={() => setMode("SIM")}
            className={`px-3 py-1 rounded-lg text-sm ${
              mode === "SIM" ? "bg-blue-500 text-black" : "bg-white/10"
            }`}
          >
            SIM
          </button>

          <span className="text-xs text-slate-400 ml-3 self-center">
            Mode: {mode}
          </span>
        </div>

        {/* EARLY WARNING */}
        <EarlyWarningCard
          metrics={safeData?.metrics}
          warning={safeData?.early_warning}
        />

        {/* FILTER */}
        <FilterBar
          selectedCommodity={selectedCommodity}
          setSelectedCommodity={setSelectedCommodity}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
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
            realtime={mode === "SIM"}
          />
        </div>

        {/* AI INSIGHT */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">AI Insight</h2>

          <div className="space-y-4">
            {safeData?.early_warning && (
              <div className="bg-red-500/20 border border-red-500/20 rounded-2xl p-4">
                <p className="text-red-300 font-medium">
                  Status Early Warning: {safeData.early_warning.status}
                </p>
              </div>
            )}

            {safeData?.evaluation_interpretation && (
              <div className="bg-yellow-500/20 border border-yellow-500/20 rounded-2xl p-4">
                <p className="text-yellow-300 font-medium">
                  {safeData.evaluation_interpretation.interpretation}
                </p>
              </div>
            )}

            {safeData?.lead_time_analysis && (
              <div className="bg-blue-500/20 border border-blue-500/20 rounded-2xl p-4">
                <p className="text-blue-300 font-medium">
                  Lead Time: {safeData.lead_time_analysis.assessment}
                </p>
              </div>
            )}

            {safeData?.evaluation && (
              <div className="bg-green-500/20 border border-green-500/20 rounded-2xl p-4">
                <p className="text-green-300 font-medium">
                  MAPE Model: {Number(safeData.evaluation.mape).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =========================
            DATA TABLE (NEW 🔥)
        ========================= */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Data Historis Harga
          </h2>

          <DataTable data={tableData} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;