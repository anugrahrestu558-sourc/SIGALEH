import { AlertTriangle, ShieldCheck, Activity } from "lucide-react";

/**
 * AI Early Warning Card (Capstone Grade)
 * - dynamic severity system
 * - fintech-style alert UI
 * - explainable AI behavior
 */

function getAlertLevel(metrics = {}) {
  const daily = metrics?.delta_harian_pct || 0;
  const weekly = metrics?.delta_mingguan_pct || 0;

  const volatility = Math.abs(daily) + Math.abs(weekly);

  if (volatility >= 12) {
    return {
      level: "CRITICAL",
      color: "red",
      icon: AlertTriangle,
      desc: "Lonjakan harga ekstrem terdeteksi",
    };
  }

  if (volatility >= 7) {
    return {
      level: "ALERT",
      color: "orange",
      icon: Activity,
      desc: "Perubahan harga signifikan terdeteksi",
    };
  }

  if (volatility >= 3) {
    return {
      level: "WATCHLIST",
      color: "yellow",
      icon: AlertTriangle,
      desc: "Pergerakan harga mulai meningkat",
    };
  }

  return {
    level: "STABLE",
    color: "green",
    icon: ShieldCheck,
    desc: "Harga relatif stabil",
  };
}

function EarlyWarningCard({ metrics }) {
  const alert = getAlertLevel(metrics || {});
  const Icon = alert.icon;

  const colorMap = {
    red: "border-red-500/30 bg-red-500/10 text-red-400",
    orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    yellow: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    green: "border-green-500/30 bg-green-500/10 text-green-400",
  };

  return (
    <div
      className={`
        p-5 rounded-2xl border backdrop-blur-md shadow-xl
        transition-all duration-300
        ${colorMap[alert.color]}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">
          <Icon size={18} />
          <h3 className="font-bold text-sm">
            AI EARLY WARNING
          </h3>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
          {alert.level}
        </span>

      </div>

      {/* DESCRIPTION */}
      <p className="text-sm opacity-80 mb-4">
        {alert.desc}
      </p>

      {/* METRICS */}
      <div className="grid grid-cols-2 gap-3 text-xs">

        <div className="bg-black/20 p-2 rounded-lg">
          <p className="opacity-60">Harian</p>
          <p className="font-semibold">
            {metrics?.delta_harian_pct || 0}%
          </p>
        </div>

        <div className="bg-black/20 p-2 rounded-lg">
          <p className="opacity-60">Mingguan</p>
          <p className="font-semibold">
            {metrics?.delta_mingguan_pct || 0}%
          </p>
        </div>

      </div>
    </div>
  );
}

export default EarlyWarningCard;