"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
  quantity: number
  onQuantityChange: (qty: number) => void
}

export default function CheckoutModal({ isOpen, onClose, product, quantity, onQuantityChange }: CheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [error, setError] = useState("")

  const totalAmount = (product?.price || 0) * quantity

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Create order
      const createOrderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          amount: totalAmount,
        }),
      })

      if (!createOrderRes.ok) throw new Error("Failed to create order")

      const orderData = await createOrderRes.json()

      // Load Razorpay script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Your Company",
          description: product.title,
          order_id: orderData.razorpayOrderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              const verifyRes = await fetch("/api/orders/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: orderData.orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              })

              if (verifyRes.ok) {
                alert("Payment successful! Thank you for your order.")
                onClose()
              } else {
                throw new Error("Payment verification failed")
              }
            } catch (err) {
              setError("Payment verification failed")
            } finally {
              setIsLoading(false)
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (err: any) {
      setError(err.message || "Payment failed")
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Complete your purchase</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Summary */}
          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between">
                <span>{product?.title}</span>
                <span>₹{product?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Quantity:</span>
                <div className="flex gap-2 items-center">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{quantity}</span>
                  <button className="px-2 py-1 border rounded" onClick={() => onQuantityChange(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-cyan-600 dark:text-cyan-400">₹{totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ₹${totalAmount.toFixed(2)}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
