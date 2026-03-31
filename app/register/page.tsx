"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // demo validation
    setError("Бүх талбарыг бөглөнө үү")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-white via-blue-50 to-cyan-50">

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border">

        {/* LOGO */}
        <Link href="/" className="block mb-6 text-center">
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
            MAccounting
          </h1>
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Бүртгүүлэх</h1>
        <p className="text-gray-500 mb-6 text-sm">Шинэ аккаунт үүсгэнэ үү</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Нэр"
            className={`w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 transition
            ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}`}
          />

          <input
            type="email"
            placeholder="Имэйл"
            className={`w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 transition
            ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}`}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг"
              className={`w-full border rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 
              focus:outline-none focus:ring-2 transition
              ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? (<EyeOff size={20} />) : (<Eye size={20} />)}
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-400 text-white py-3 rounded-xl font-medium 
            hover:scale-[1.02] hover:shadow-lg transition"
          >
            🚀 Бүртгүүлэх
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Аль хэдийн бүртгэлтэй юу?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Нэвтрэх
          </Link>
        </p>

      </div>
    </div>
  )
}