import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Info,
  TrendingUp,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="
      w-64
      bg-white/5
      backdrop-blur-md
      border-r border-white/10
      min-h-screen
      p-6
    ">

      <div className="mb-10">

        <h1 className="text-3xl font-bold text-green-400">
          SiGALEH
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          AI Food Price Prediction
        </p>

      </div>

      <nav className="flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="
            flex items-center gap-3
            text-slate-300
            hover:bg-green-500/10
            hover:text-green-400
            px-4 py-3
            rounded-xl
            transition
          "
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/about"
          className="
            flex items-center gap-3
            text-slate-300
            hover:bg-green-500/10
            hover:text-green-400
            px-4 py-3
            rounded-xl
            transition
          "
        >
          <Info size={20} />
          About
        </Link>

        <Link
          to="/"
          className="
            flex items-center gap-3
            text-slate-300
            hover:bg-green-500/10
            hover:text-green-400
            px-4 py-3
            rounded-xl
            transition
          "
        >
          <TrendingUp size={20} />
          Home
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;