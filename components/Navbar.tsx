import Link from "next/link"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
          MAccounting
        </h1>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">

          <a href="#features" className="relative text-gray-600 hover:text-gray-900 transition">
            Features
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-400 transition-all group-hover:w-full" />
          </a>

          <a href="#howitworks" className="relative text-gray-600 hover:text-gray-900 transition">
            How it works
          </a>

          <a href="#pricing" className="relative text-gray-600 hover:text-gray-900 transition">
            Pricing
          </a>

        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">

          <Link href="/login" className="hidden sm:block text-gray-600 hover:text-gray-900 transition">
            Login
          </Link>

          <Link
            href="/register"
            className="bg-linear-to-r from-blue-600 to-cyan-400 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition"
          >
            🚀 Эхлэх
          </Link>

        </div>

      </div>
    </div>
  )
}