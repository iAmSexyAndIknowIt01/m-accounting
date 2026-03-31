export function HowItWorks() {
  const steps = [
    {
      title: 'Бүртгүүлэх',
      desc: '1 минутанд account үүсгэнэ',
    },
    {
      title: 'Мэдээлэл оруулах',
      desc: 'Орлого, зарлага нэмэх',
    },
    {
      title: 'Тайлан авах',
      desc: '1 click → бүх тайлан',
    },
  ]

  return (
    <section id="howitworks" className="py-32 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold mb-16 text-gray-800">
        Яаж ажилладаг вэ
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {i + 1}
            </div>
            <h3 className="font-semibold mb-2 text-gray-800">
              {s.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}