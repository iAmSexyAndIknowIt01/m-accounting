const features = [
  {
    title: 'Орлого / Зарлага',
    desc: 'Бүх орлого, зарлагыг realtime хянаж, автомат ангилал хийнэ',
    highlight: 'Cashflow бүрэн хяналт',
    icon: '💰',
  },
  {
    title: 'Нэхэмжлэл',
    desc: 'PDF invoice үүсгэж, шууд илгээх боломжтой',
    highlight: '1 click invoice',
    icon: '🧾',
  },
  {
    title: 'Тайлан',
    desc: 'Balance sheet, income statement автоматаар гарна',
    highlight: 'Автомат тайлан',
    icon: '📊',
  },
]
export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-white relative overflow-hidden">

      {/* subtle background */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-blue-50/40 to-white -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight text-gray-800">
          Бүх санхүү
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-400">
            нэг платформ дээр
          </span>
        </h2>

        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-20 text-lg">
          Excel, гараар тооцоолол мартаг.
          <br />
          <span className="text-gray-700 font-medium">
            Бүх процесс автоматаар шийдэгдэнэ
          </span>
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              {/* icon */}
              <div className="text-3xl mb-4">
                {f.icon}
              </div>

              {/* title */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800 transition">
                {f.title}
              </h3>

              {/* highlight (GRADIENT LIKE HERO) */}
              <p className="text-sm font-semibold mb-2 bg-linear-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
                {f.highlight}
              </p>

              {/* desc */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* line */}
              <div className="mt-6 h-0.5 w-0 bg-linear-to-r from-blue-600 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}