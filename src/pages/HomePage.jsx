import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-white">
      
      <section className="max-w-7xl mx-auto py-24 px-6">
        
        <div className="max-w-3xl">

          <h1 className="text-6xl font-bold leading-tight">
            Prediksi Harga Pangan Dengan
            <span className="text-green-400"> AI</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-relaxed">
            SiGALEH membantu masyarakat, pedagang,
            dan pemerintah memantau serta memprediksi
            lonjakan harga pangan menggunakan teknologi
            Artificial Intelligence berbasis data cuaca
            dan historis harga.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/dashboard"
              className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold"
            >
              Lihat Dashboard
            </Link>

            <button className="border border-slate-700 hover:border-green-400 transition px-6 py-3 rounded-xl">
              Pelajari Lebih Lanjut
            </button>

          </div>

        </div>

      </section>
      <section className="max-w-7xl mx-auto px-6 py-20">

  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold">
      Fitur Unggulan SiGALEH
    </h2>

    <p className="text-slate-400 mt-4">
      Platform prediksi harga pangan berbasis AI dan analisis cuaca.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
      <h3 className="text-2xl font-semibold text-green-400">
        Prediksi AI
      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">
        Menggunakan model LSTM untuk memprediksi
        harga pangan 7–30 hari ke depan.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
      <h3 className="text-2xl font-semibold text-green-400">
        Early Warning
      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">
        Memberikan sinyal aman, waspada,
        dan bahaya terhadap potensi lonjakan harga.
      </p>
    </div>

    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
      <h3 className="text-2xl font-semibold text-green-400">
        Analisis Cuaca
      </h3>

      <p className="mt-4 text-slate-300 leading-relaxed">
        Menghubungkan data curah hujan,
        suhu, dan kelembapan terhadap harga pangan.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

export default HomePage;