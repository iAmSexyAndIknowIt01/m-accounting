import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу" },
        { status: 401 }
      )
    }

    // ✅ response үүсгэнэ
    const res = NextResponse.json({
      success: true,
    })

    // 🔥 USER ID cookie-д хадгална
    res.cookies.set("user_id", data.user.id, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 өдөр
    })

    // 🔥 (optional) access token хадгалж болно
    res.cookies.set("access_token", data.session?.access_token || "", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    })

    return res

  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}