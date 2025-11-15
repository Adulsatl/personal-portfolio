import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  key_secret: process.env.STRIPE_SECRET_KEY || "",
})

export async function POST(req: Request) {
  try {
    const { productId, quantity, customerName, customerEmail, customerPhone, amount } = await req.json()

    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    // Verify product exists
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single()

    if (productError || !product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        productId,
        quantity,
        customerEmail,
      },
    })

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          razorpay_order_id: razorpayOrder.id,
          product_id: productId,
          quantity,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          total_amount: amount,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (orderError) throw orderError

    return Response.json({
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
