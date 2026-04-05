"use client"

import { useEffect, useState } from "react"
import { Home, BarChart3, Settings, LogOut, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // 🔥 API + userId авах
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 👉 user_id cookie авах
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user_id="))

        const id = cookie?.split("=")[1]
        setUserId(id || null)

        // 👉 API дуудах
        const res = await fetch("/api/dashboard")

        if (!res.ok) {
          throw new Error("API failed")
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("API error:", err)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  // ⏳ loading хамгаалалт
  if (loading || !data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-linear-to-br from-white via-blue-50 to-cyan-50 text-gray-900">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/70 backdrop-blur border-r p-6 hidden md:flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-10">MAccounting</h1>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 text-blue-600 font-medium bg-blue-50 p-3 rounded-xl">
              <Home size={18} />
              Dashboard
            </div>

            <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl">
              <BarChart3 size={18} />
              Тайлан
            </div>

            <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl">
              <Settings size={18} />
              Тохиргоо
            </div>
          </nav>
        </div>

        <Link href="/" className="flex items-center gap-2 text-gray-500">
          <LogOut size={18} />
          Logout
        </Link>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="flex items-center border rounded-xl px-3 py-2">
              <Search size={16} className="mr-2" />
              <input placeholder="Хайх..." className="outline-none text-sm" />
            </div>

            {/* AVATAR */}
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:scale-105 transition">
                {userId ? userId[0].toUpperCase() : "?"}
              </div>

              {/* TOOLTIP */}
              <div className="absolute right-0 mt-2 px-3 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                {userId ? `ID: ${userId}` : "No user"}
              </div>
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl text-white bg-blue-500">
              <p>Нийт орлого</p>
              <h3 className="text-2xl font-bold">
                ₮{data.stats.income.toLocaleString()}
              </h3>
            </div>

            <div className="p-6 rounded-2xl text-white bg-red-500">
              <p>Нийт зардал</p>
              <h3 className="text-2xl font-bold">
                ₮{data.stats.expense.toLocaleString()}
              </h3>
            </div>

            <div className="p-6 rounded-2xl text-white bg-green-500">
              <p>Ашиг</p>
              <h3 className="text-2xl font-bold">
                ₮{data.stats.profit.toLocaleString()}
              </h3>
            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Сүүлийн гүйлгээ</h3>

            <div className="divide-y text-sm">
              {data.transactions.map((t: any) => (
                <div key={t.id} className="flex justify-between py-3">
                  <span>{t.type}</span>
                  <span
                    className={
                      t.amount > 0 ? "text-green-600" : "text-red-500"
                    }
                  >
                    {t.amount > 0 ? "+" : ""}₮{Math.abs(t.amount).toLocaleString()}
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