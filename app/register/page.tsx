"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const [mode, setMode] = useState<"user" | "company">("user")

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyCode, setCompanyCode] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // ✅ COMMON validation
    if (!email || !password) {
      setError("Имэйл болон нууц үг оруулна уу")
      setLoading(false)
      return
    }

    // ✅ USER validation
    if (mode === "user") {
      if (!firstName || !lastName) {
        setError("Овог нэр оруулна уу")
        setLoading(false)
        return
      }

      if (!companyCode) {
        setError("Компанийн код оруулна уу")
        setLoading(false)
        return
      }
    }

    // ✅ COMPANY validation
    if (mode === "company") {
      if (!companyName) {
        setError("Компанийн нэр оруулна уу")
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          firstName,
          lastName,
          companyCode,
          companyName,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      router.push("/login")
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

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Бүртгүүлэх</h1>
        <p className="text-gray-500 mb-6 text-sm">Шинэ аккаунт үүсгэнэ үү</p>

        {/* 🔥 TOGGLE */}
        <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setMode("user")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "user"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            👤 User
          </button>
          <button
            type="button"
            onClick={() => setMode("company")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "company"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            🏢 Company
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 👤 USER ONLY: ОВОГ + НЭР */}
          {mode === "user" && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Овог"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-xl px-4 py-3 text-gray-900"
              />
              <input
                type="text"
                placeholder="Нэр"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-xl px-4 py-3 text-gray-900"
              />
            </div>
          )}

          {/* 🔥 CONDITIONAL FIELD */}
          {mode === "user" ? (
            <div>
              <input
                type="text"
                placeholder="Компанийн код"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-gray-900"
              />
              <p className="text-xs text-gray-400 mt-1">
                Компанийн кодыг админаасаа авна уу
              </p>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Компанийн нэр"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-gray-900"
              />
              <p className="text-xs text-gray-400 mt-1">
                Та дараа нь хэрэглэгч нэмэх боломжтой
              </p>
            </div>
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-gray-900"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 pr-12 text-gray-900"
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
            {loading ? "Бүртгэж байна..." : "🚀 Бүртгүүлэх"}
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