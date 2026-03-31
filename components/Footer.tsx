export default function Footer() {
  return (
    <footer className="relative px-6 pt-24 pb-10 overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-10 mb-16">

          {/* brand */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              MAccounting
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              ЖДҮ-д зориулсан санхүүгийн ухаалаг систем.
              Бүх тайланг автоматаар.
            </p>
          </div>

          {/* product */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Бүтээгдэхүүн
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-blue-600 cursor-pointer">Features</li>
              <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
              <li className="hover:text-blue-600 cursor-pointer">Demo</li>
            </ul>
          </div>

          {/* company */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Компани
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-blue-600 cursor-pointer">About</li>
              <li className="hover:text-blue-600 cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">
              Холбоо барих
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>contact@maccounting.mn</li>
              <li>+976 9911 2233</li>
            </ul>
          </div>

        </div>

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

        {/* bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

          <p>
            © 2026 MAccounting. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-blue-600 cursor-pointer">Privacy</span>
            <span className="hover:text-blue-600 cursor-pointer">Terms</span>
          </div>

        </div>

      </div>
    </footer>
  )
}