import { useState, useEffect } from "react";

/**
 * =========================
 * DUMMY DATA
 * =========================
 */
const dummyData = {
  cabaimerah: {
    metrics: {
      harga_terakhir: 45000,
      delta_harian_pct: 2.4,
      delta_mingguan_pct: 8.1,
      rata_rata_30_hari: 42000,
    },
  },

  cabairawit: {
    metrics: {
      harga_terakhir: 70000,
      delta_harian_pct: 5.1,
      delta_mingguan_pct: 12.5,
      rata_rata_30_hari: 65000,
    },
  },

  bawangmerah: {
    metrics: {
      harga_terakhir: 38000,
      delta_harian_pct: -1.2,
      delta_mingguan_pct: 3.8,
      rata_rata_30_hari: 36000,
    },
  },

  minyakgorengcurah: {
    metrics: {
      harga_terakhir: 16000,
      delta_harian_pct: 0.5,
      delta_mingguan_pct: 1.3,
      rata_rata_30_hari: 15500,
    },
  },
};

/**
 * =========================
 * MAIN HOOK
 * =========================
 */
function useDashboard(commodity, city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!commodity || !city) return;

    const controller = new AbortController();

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3000/dashboard?komoditas=${encodeURIComponent(
            commodity
          )}&wilayah=${encodeURIComponent(city)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dashboard");
        }

        const result = await response.json();

        setData(buildSafeResponse(result, commodity));
      } catch (err) {
        if (err.name === "AbortError") return;

        console.warn("Fallback aktif:", err);

        setData(buildSafeResponse(null, commodity));
        setError("Backend belum terhubung / fallback aktif");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    return () => controller.abort();
  }, [commodity, city]);

  return { data, loading, error };
}

/**
 * =========================
 * SAFE RESPONSE BUILDER
 * =========================
 */
function buildSafeResponse(result, commodity) {
  const key = normalizeKey(commodity);
  const matched = findBestDummyMatch(key);

  return {
    metrics:
      result?.metrics ??
      matched?.metrics ?? {
        harga_terakhir: 0,
        delta_harian_pct: 0,
        delta_mingguan_pct: 0,
        rata_rata_30_hari: 0,
      },

    evaluation: result?.evaluation ?? {
      trend: "+10%",
      da: 89,
      mape: 4.5,
    },

    early_warning: result?.early_warning ?? {
      status: "WASPADA",
    },

    charts: {
      historical: normalizeChart(
        result?.charts?.historical ?? generateDummyChart()
      ),

      future: normalizeChart(
        result?.charts?.future ?? generateDummyChart()
      ),
    },
  };
}

/**
 * =========================
 * MATCHER
 * =========================
 */
function findBestDummyMatch(key) {
  const mapping = {
    cabaimerah: "cabaimerah",
    cabairawit: "cabairawit",
    bawangmerah: "bawangmerah",
    minyakgoreng: "minyakgorengcurah",
    minyakgorengcurah: "minyakgorengcurah",
  };

  return dummyData[mapping[key]] ?? null;
}

/**
 * =========================
 * NORMALIZE CHART (FIXED)
 * =========================
 */
function normalizeChart(data = []) {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    day: item?.day ?? item?.time ?? `Hari ${index + 1}`,

    actual: safeNumber(
      item?.actual ?? item?.price ?? item?.harga ?? item?.y ?? item?.value
    ),

    prediction: safeNumber(
      item?.prediction ??
        item?.forecast ??
        item?.pred ??
        item?.actual ??
        item?.price
    ),
  }));
}

/**
 * SAFE NUMBER
 */
function safeNumber(val) {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

/**
 * NORMALIZE KEY
 */
function normalizeKey(str = "") {
  return str.toLowerCase().replace(/\s/g, "");
}

/**
 * DUMMY CHART
 */
function generateDummyChart() {
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

export default useDashboard;