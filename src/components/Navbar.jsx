import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold text-green-400"
        >
          SiGALEH
        </Link>

        <div className="flex gap-6 text-slate-300">
          <Link
            to="/"
            className="hover:text-green-400 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-green-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            className="hover:text-green-400 transition"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;