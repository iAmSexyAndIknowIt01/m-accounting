"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Алдаа гарлаа")
        setLoading(false)
        return
      }

      // ✅ амжилттай login
      router.push("/dashboard")
    } catch (err) {
      setError("Сервертэй холбогдож чадсангүй")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-white via-blue-50 to-cyan-50">

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border">

        <Link href="/" className="block mb-6 text-center">
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
            MAccounting
          </h1>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Нэвтрэх</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-cyan-400 text-white py-3 rounded-xl font-medium hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>
      </div>
    </div>
  )
}