import WarningBadge from "./WarningBadge";

import {
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

function StatCard({
  title,
  value,
  status,
  change,
}) {

  const getTrendIcon = () => {

    if (change > 0) {
      return (
        <TrendingUp
          className="text-red-400"
          size={22}
        />
      );
    }

    if (change < 0) {
      return (
        <TrendingDown
          className="text-green-400"
          size={22}
        />
      );
    }

    return (
      <Activity
        className="text-yellow-400"
        size={22}
      />
    );
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-white/5
        backdrop-blur-md
        border border-white/10
        p-6
        rounded-3xl
        shadow-xl
        hover:scale-[1.03]
        hover:border-sky-500/30
        transition-all
        duration-300
        group
      "
    >

      {/* GLOW EFFECT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-sky-500/5
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
        "
      />

      {/* TOP SECTION */}
      <div className="flex items-start justify-between relative z-10">

        <div>

          <h2 className="text-slate-400 text-sm font-medium tracking-wide">
            {title}
          </h2>

          <h1 className="text-4xl font-bold text-white mt-3">
            {value}
          </h1>

          {change !== undefined && (
            <p
              className={
                change >= 0
                  ? "text-red-400 text-sm font-medium mt-2"
                  : "text-green-400 text-sm font-medium mt-2"
              }
            >
              {change >= 0 ? "+" : ""}
              {Number(change).toFixed(2)}%
            </p>
          )}

        </div>

        <div
          className="
            bg-white/10
            border border-white/10
            p-3
            rounded-2xl
          "
        >
          {getTrendIcon()}
        </div>

      </div>

      {/* STATUS */}
      <div className="mt-6 relative z-10">
        <WarningBadge status={status} />
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between relative z-10">

        <p className="text-slate-500 text-sm">
          Update realtime
        </p>

        <span className="text-green-400 text-xs">
          ● LIVE
        </span>

      </div>

    </div>
  );
}

export default StatCard;