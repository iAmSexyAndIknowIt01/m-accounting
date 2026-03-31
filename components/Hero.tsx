export default function Hero() {
  return (
    <section className="relative py-36 px-6 text-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-100 -z-10" />

      {/* glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-400 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-cyan-400 opacity-20 blur-3xl rounded-full" />

      {/* BADGE */}
      <div className="mb-6 flex justify-center">
        <span className="px-5 py-2 text-sm bg-white/80 backdrop-blur border border-blue-100 text-blue-700 rounded-full shadow-sm">
          🚀 Монголын ЖДҮ-д зориулсан SaaS
        </span>
      </div>

      {/* HEADING */}
      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">

        <span className="block text-gray-900">
          Санхүүгээ
        </span>

        <span className="block text-blue-600">
          ухаалгаар удирд
        </span>

      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
        Орлого, зарлага, нэхэмжлэл, тайлан —
        <span className="text-gray-800 font-medium"> бүгдийг нэг дор.</span>
        <br />
        <span className="text-blue-600 font-semibold">
          1 click → Бүх тайлан автоматаар
        </span>
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">

        <button className="px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg hover:scale-105 transition">
          🚀 Үнэгүй эхлэх
        </button>

        <button className="px-8 py-4 rounded-2xl border bg-white/80 backdrop-blur hover:bg-white transition">
          ▶ Demo үзэх
        </button>
      </div>

      {/* TRUST */}
      <p className="text-sm text-gray-400 mb-12">
        100+ бизнес аль хэдийн ашиглаж байна
      </p>

    </section>
  )
}