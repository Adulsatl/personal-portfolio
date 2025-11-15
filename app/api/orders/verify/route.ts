import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = await req.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    // Update order with payment details
    const { error } = await supabase
      .from("orders")
      .update({
        razorpay_payment_id: razorpayPaymentId,
        status: "paid",
        updated_at: new Date(),
      })
      .eq("id", orderId)

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return Response.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
