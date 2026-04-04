"use client"

import { Home, BarChart3, Settings, LogOut, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-linear-to-br from-white via-blue-50 to-cyan-50 text-gray-900">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/70 backdrop-blur border-r p-6 hidden md:flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text mb-10">
            MAccounting
          </h1>

          <nav className="space-y-2">

            {/* ACTIVE */}
            <div className="flex items-center gap-3 text-blue-600 font-medium bg-blue-50 p-3 rounded-xl relative">
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-r"></span>
              <Home size={18} />
              Dashboard
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl cursor-pointer transition">
              <BarChart3 size={18} />
              Тайлан
            </div>

            <div className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl cursor-pointer transition">
              <Settings size={18} />
              Тохиргоо
            </div>

          </nav>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white/60 backdrop-blur">

          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Хайх..."
                className="outline-none text-sm bg-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* AVATAR */}
            <div className="w-9 h-9 rounded-full bg-linear-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-105 transition">
              T
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl text-white bg-linear-to-r from-blue-600 to-cyan-400 shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-80">Нийт орлого</p>
              <h3 className="text-2xl font-bold mt-2">₮12,500,000</h3>
            </div>

            <div className="p-6 rounded-2xl text-white bg-linear-to-r from-red-500 to-pink-400 shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-80">Нийт зардал</p>
              <h3 className="text-2xl font-bold mt-2">₮5,200,000</h3>
            </div>

            <div className="p-6 rounded-2xl text-white bg-linear-to-r from-green-500 to-emerald-400 shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
              <p className="text-sm opacity-80">Ашиг</p>
              <h3 className="text-2xl font-bold mt-2">₮7,300,000</h3>
            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h3 className="font-semibold mb-4">Сүүлийн гүйлгээ</h3>

            <div className="divide-y text-sm">

              <div className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition">
                <span>Орлого</span>
                <span className="text-green-600 font-medium">+₮500,000</span>
              </div>

              <div className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition">
                <span>Зардал</span>
                <span className="text-red-500 font-medium">-₮120,000</span>
              </div>

              <div className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition">
                <span>Орлого</span>
                <span className="text-green-600 font-medium">+₮1,200,000</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}