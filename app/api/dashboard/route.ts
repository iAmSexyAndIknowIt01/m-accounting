import { NextResponse } from "next/server"

export async function GET() {
  // 🔥 dummy data
  const data = {
    stats: {
      income: 12500000,
      expense: 5200000,
      profit: 7300000,
    },
    transactions: [
      { id: 1, type: "Орлого", amount: 500000 },
      { id: 2, type: "Зардал", amount: -120000 },
      { id: 3, type: "Орлого", amount: 1200000 },
    ],
  }

  return NextResponse.json(data)
}