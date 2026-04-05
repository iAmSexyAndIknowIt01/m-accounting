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

    if (error) {
      return NextResponse.json(
        { message: "Имэйл эсвэл нууц үг буруу" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: data.user,
      session: data.session,
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}