import {
  AlertTriangle,
  ShieldCheck,
  Activity,
} from "lucide-react";

function getAlertConfig(status = "AMAN") {

  switch (status) {

    case "KRITIS":
      return {
        color: "red",
        icon: AlertTriangle,
        desc: "Potensi lonjakan harga tinggi terdeteksi",
      };

    case "WASPADA":
      return {
        color: "yellow",
        icon: Activity,
        desc: "Potensi kenaikan harga mulai terdeteksi",
      };

    default:
      return {
        color: "green",
        icon: ShieldCheck,
        desc: "Harga relatif stabil",
      };
  }
}

function EarlyWarningCard({
  metrics,
  warning,
}) {

  const status =
    warning?.status || "AMAN";

  const alert =
    getAlertConfig(status);

  const Icon =
    alert.icon;

  const colorMap = {
    red:
      "border-red-500/30 bg-red-500/10 text-red-400",

    yellow:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",

    green:
      "border-green-500/30 bg-green-500/10 text-green-400",
  };

  return (
    <div
      className={`
        p-5
        rounded-2xl
        border
        backdrop-blur-md
        shadow-xl
        transition-all
        duration-300
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

        <span
          className="
            text-xs
            px-3
            py-1
            rounded-full
            bg-white/10
            border
            border-white/10
          "
        >
          {status}
        </span>

      </div>

      {/* DESCRIPTION */}
      <p className="text-sm opacity-80 mb-4">
        {alert.desc}
      </p>

      {/* METRICS */}
      <div className="grid grid-cols-2 gap-3 text-xs">

        <div className="bg-black/20 p-2 rounded-lg">

          <p className="opacity-60">
            Perubahan Harian
          </p>

          <p className="font-semibold">
            {Number(
              metrics?.delta_harian_pct || 0
            ).toFixed(2)}
            %
          </p>

        </div>

        <div className="bg-black/20 p-2 rounded-lg">

          <p className="opacity-60">
            Perubahan Mingguan
          </p>

          <p className="font-semibold">
            {Number(
              metrics?.delta_mingguan_pct || 0
            ).toFixed(2)}
            %
          </p>

        </div>

      </div>

      {/* THRESHOLD INFO */}
      {warning && (
        <div className="mt-4 text-xs opacity-80">

          <div className="flex justify-between">

            <span>Baseline</span>

            <span>
              Rp{" "}
              {Number(
                warning.baseline || 0
              ).toLocaleString("id-ID")}
            </span>

          </div>

          <div className="flex justify-between mt-1">

            <span>Threshold Waspada</span>

            <span>
              Rp{" "}
              {Number(
                warning.threshold_waspada || 0
              ).toLocaleString("id-ID")}
            </span>

          </div>

          <div className="flex justify-between mt-1">

            <span>Threshold Kritis</span>

            <span>
              Rp{" "}
              {Number(
                warning.threshold_kritis || 0
              ).toLocaleString("id-ID")}
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

export default EarlyWarningCard;