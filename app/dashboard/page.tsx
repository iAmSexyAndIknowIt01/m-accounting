"use client"

import { useEffect, useState } from "react"
import {
  Home,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  PlusCircle
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user_id="))

        const id = cookie?.split("=")[1]
        setUserId(id || null)

        const res = await fetch("/api/dashboard")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading || !data) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-50 to-blue-100 text-gray-900">

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-50 h-screen md:h-auto w-64
          bg-white/90 backdrop-blur-xl border-r p-6
          transform transition-transform duration-300
          flex flex-col justify-between overflow-y-auto
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div>
          <h1 className="text-xl font-bold mb-10 tracking-tight">
            MAccounting
          </h1>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 text-blue-600 font-medium bg-blue-50 p-3 rounded-xl shadow-sm">
              <Home size={18} />
              Dashboard
            </div>

            <Link
              href="/dashboard/transactions/new"
              className="flex items-center gap-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-xl transition"
            >
              <PlusCircle size={18} />
              Гүйлгээ бүртгэх
            </Link>

            <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-3 rounded-xl transition">
              <BarChart3 size={18} />
              Тайлан
            </div>

            <div className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 p-3 rounded-xl transition">
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
        <div className="sticky top-0 z-10 flex justify-between items-center px-4 md:px-6 py-4 backdrop-blur-xl bg-white/60 border-b">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <h2 className="text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* SEARCH (mobile дээр hidden) */}
            <div className="hidden sm:flex items-center bg-white rounded-xl px-3 py-2 shadow-sm border focus-within:ring-2 focus-within:ring-blue-400">
              <Search size={16} className="mr-2 text-gray-400" />
              <input
                placeholder="Хайх..."
                className="outline-none text-sm bg-transparent"
              />
            </div>

            {/* AVATAR */}
            <div className="relative group">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:scale-105 transition">
                {userId ? userId[0].toUpperCase() : "?"}
              </div>

              <div className="absolute right-0 mt-2 px-3 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
                {userId ? `ID: ${userId}` : "No user"}
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-6 space-y-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

            <div className="p-6 rounded-2xl bg-linear-to-r from-blue-500 to-blue-400 text-white shadow-lg hover:scale-[1.02] transition">
              <p className="text-sm opacity-80">Нийт орлого</p>
              <h3 className="text-2xl font-bold mt-2">
                ₮{data.stats.income.toLocaleString()}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-linear-to-r from-red-500 to-pink-400 text-white shadow-lg hover:scale-[1.02] transition">
              <p className="text-sm opacity-80">Нийт зардал</p>
              <h3 className="text-2xl font-bold mt-2">
                ₮{data.stats.expense.toLocaleString()}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-linear-to-r from-green-500 to-emerald-400 text-white shadow-lg hover:scale-[1.02] transition">
              <p className="text-sm opacity-80">Ашиг</p>
              <h3 className="text-2xl font-bold mt-2">
                ₮{data.stats.profit.toLocaleString()}
              </h3>
            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg p-4 md:p-6 overflow-x-auto">
            <h3 className="font-semibold mb-4">Сүүлийн гүйлгээ</h3>

            <div className="divide-y text-sm min-w-75">
              {data.transactions.map((t: any) => (
                <div
                  key={t.id}
                  className="flex justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition"
                >
                  <span className="font-medium">{t.type}</span>
                  <span
                    className={
                      t.amount > 0
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {t.amount > 0 ? "+" : ""}₮
                    {Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}