const plans = [
  {
    name: 'Basic',
    price: '20k₮',
    desc: 'Жижиг бизнес эхлэхэд',
    features: [
      'Орлого / зарлага tracking',
      'Basic тайлан',
      '1 хэрэглэгч',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '50k₮',
    desc: 'Өсөж буй бизнесүүдэд',
    features: [
      'Бүх feature',
      'Автомат тайлан',
      'Нэхэмжлэл илгээх',
      'Олон хэрэглэгч',
    ],
    popular: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white -z-10" />

      <div className="max-w-6xl mx-auto text-center">

        {/* heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Энгийн
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            ил тод үнэ
          </span>
        </h2>

        <p className="text-gray-500 mb-20 text-lg">
          Нуугдмал төлбөргүй. Хэзээ ч цуцалж болно.
        </p>

        {/* cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-[1px] transition ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-400 shadow-2xl scale-105'
                  : 'bg-gray-100'
              }`}
            >

              <div className="bg-white rounded-3xl p-10 h-full flex flex-col">

                {/* badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow">
                      🔥 Хамгийн их сонгосон
                    </span>
                  </div>
                )}

                {/* name */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {plan.name}
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                  {plan.desc}
                </p>

                {/* price */}
                <p className="text-4xl font-bold mb-6 text-gray-800">
                  {plan.price}
                  <span className="text-sm text-gray-400 font-normal"> /сар</span>
                </p>

                {/* features */}
                <ul className="text-left space-y-3 mb-8 flex-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="text-blue-500">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-medium transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow-lg hover:scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Эхлэх
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}