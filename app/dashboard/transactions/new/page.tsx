"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewTransactionPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "income",
  })

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    if (!form.description.trim()) {
      return setError("Тайлбар оруулна уу")
    }

    if (!form.amount || Number(form.amount) <= 0) {
      return setError("Дүн буруу байна")
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("description", form.description)
      formData.append(
        "amount",
        String(
          form.type === "expense"
            ? -Math.abs(Number(form.amount))
            : Math.abs(Number(form.amount))
        )
      )
      formData.append("type", form.type)

      if (image) {
        formData.append("file", image)
      }

      const res = await fetch("/api/transactions", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Алдаа гарлаа")
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-4 flex justify-center">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          💸 Гүйлгээ бүртгэх
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-2xl shadow-md space-y-5"
        >

          {/* TYPE TOGGLE */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "income" })}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                form.type === "income"
                  ? "bg-green-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Орлого
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, type: "expense" })}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                form.type === "expense"
                  ? "bg-red-500 text-white"
                  : "text-gray-700"
              }`}
            >
              Зардал
            </button>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold text-gray-800">
              Тайлбар
            </label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 text-gray-900 placeholder:text-gray-400 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-md rounded-lg px-3 py-2 outline-none"
              placeholder="Жишээ: Цалин"
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-sm font-semibold text-gray-800">
              Дүн (₮)
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full mt-1 text-gray-900 placeholder:text-gray-300 bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-md rounded-lg px-3 py-2 outline-none"
              placeholder="100000"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-gray-800">
              Баримтын зураг
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-700"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 rounded-lg w-full h-40 object-cover border"
              />
            )}
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Болих
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              {loading ? "Хадгалж байна..." : "Хадгалах"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}