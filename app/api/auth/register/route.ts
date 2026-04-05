import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function generateCompanyCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(req: Request) {
  console.log("🚀 REGISTER API CALLED")

  try {
    const body = await req.json()

    console.log("📥 REQUEST BODY:", body)

    const {
      mode,
      firstName,
      lastName,
      companyCode,
      companyName,
      email,
      password,
    } = body

    // =========================
    // ✅ VALIDATION
    // =========================
    console.log("🔍 VALIDATION START")

    if (!email || !password) {
      console.warn("⚠️ EMAIL/PASSWORD MISSING")
      return NextResponse.json(
        { message: "Имэйл болон нууц үг оруулна уу" },
        { status: 400 }
      )
    }

    if (mode === "user") {
      console.log("👤 USER MODE VALIDATION")

      if (!firstName || !lastName) {
        console.warn("⚠️ NAME MISSING")
        return NextResponse.json(
          { message: "Овог нэр оруулна уу" },
          { status: 400 }
        )
      }

      if (!companyCode) {
        console.warn("⚠️ COMPANY CODE MISSING")
        return NextResponse.json(
          { message: "Компанийн код оруулна уу" },
          { status: 400 }
        )
      }
    }

    if (mode === "company") {
      console.log("🏢 COMPANY MODE VALIDATION")

      if (!companyName) {
        console.warn("⚠️ COMPANY NAME MISSING")
        return NextResponse.json(
          { message: "Компанийн нэр оруулна уу" },
          { status: 400 }
        )
      }
    }

    // =========================
    // 🔌 SUPABASE INIT
    // =========================
    console.log("🔌 INIT SUPABASE")

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    let companyId = null

    // =========================
    // 🏢 COMPANY REGISTER
    // =========================
    if (mode === "company") {
      console.log("🏢 COMPANY REGISTER START")

      let newCode = generateCompanyCode()
      console.log("🔑 GENERATED CODE:", newCode)

      let exists = true
      while (exists) {
        const { data, error } = await supabase
          .from("mt_company")
          .select("company_id")
          .eq("company_code", newCode)
          .maybeSingle()

        console.log("🔎 CHECK CODE:", { newCode, data, error })

        if (!data) {
          exists = false
        } else {
          newCode = generateCompanyCode()
        }
      }

      const { data: company, error: companyError } = await supabase
        .from("mt_company")
        .insert([
          {
            company_name: companyName,
            company_code: newCode,
          },
        ])
        .select()
        .single()

      console.log("📦 COMPANY INSERT RESULT:", { company, companyError })

      if (companyError) {
        console.error("❌ COMPANY INSERT ERROR:", companyError)
        return NextResponse.json(
          { message: "Company үүсгэхэд алдаа гарлаа" },
          { status: 500 }
        )
      }

      companyId = company.company_id
      console.log("✅ COMPANY CREATED:", companyId)
    }

    // =========================
    // 👤 USER REGISTER (JOIN)
    // =========================
    if (mode === "user") {
      console.log("👤 USER JOIN START")

      const { data: company, error: companyError } = await supabase
        .from("mt_company")
        .select("*")
        .eq("company_code", companyCode)
        .single()

      console.log("🔎 COMPANY LOOKUP:", { company, companyError })

      if (companyError || !company) {
        console.warn("⚠️ INVALID COMPANY CODE")
        return NextResponse.json(
          { message: "Компанийн код буруу байна" },
          { status: 400 }
        )
      }

      companyId = company.company_id
      console.log("✅ COMPANY FOUND:", companyId)
    }

    // =========================
    // 🔐 AUTH USER CREATE
    // =========================
    console.log("🔐 AUTH SIGNUP START")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log("🔐 AUTH RESULT:", { data, error })

    if (error) {
      console.error("❌ AUTH ERROR:", error)
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      )
    }

    // =========================
    // 💾 MT_USER INSERT
    // =========================
    if (data.user) {
      console.log("💾 INSERT USER START")

      const { error: userError } = await supabase.from("mt_user").insert([
        {
          user_id: data.user.id,
          first_name: mode === "user" ? firstName : null,
          last_name: mode === "user" ? lastName : null,
          email: email,
          company_id: companyId,
          role: mode === "company" ? "admin" : "user",
        },
      ])

      if (userError) {
        console.error("❌ USER INSERT ERROR:", userError)
        return NextResponse.json(
          { message: "User хадгалах үед алдаа гарлаа" },
          { status: 500 }
        )
      }

      console.log("✅ USER INSERTED")
    }

    console.log("🎉 REGISTER SUCCESS")

    return NextResponse.json({
      message: "Амжилттай бүртгэгдлээ",
    })

  } catch (err) {
    console.error("💥 SERVER ERROR:", err)

    return NextResponse.json(
      { message: "Server error", error: err },
      { status: 500 }
    )
  }
}