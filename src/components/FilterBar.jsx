import {
  commodities,
  cities,
} from "../data/filterOptions";

function FilterBar({
  selectedCommodity,
  setSelectedCommodity,
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div
      className="
        bg-white/5
        backdrop-blur-md
        border border-white/10
        rounded-3xl
        p-6
        mb-8
      "
    >
      <h2 className="text-xl font-bold mb-4">
        Filter Data
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 text-slate-400">
            Komoditas
          </label>

          <select
            value={selectedCommodity}
            onChange={(e) =>
              setSelectedCommodity(
                e.target.value
              )
            }
            className="
              w-full
              bg-slate-800
              border border-slate-700
              rounded-xl
              px-4 py-3
              text-white
            "
          >
            {commodities.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-slate-400">
            Wilayah
          </label>

          <select
            value={selectedCity}
            onChange={(e) =>
              setSelectedCity(
                e.target.value
              )
            }
            className="
              w-full
              bg-slate-800
              border border-slate-700
              rounded-xl
              px-4 py-3
              text-white
            "
          >
            {cities.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;