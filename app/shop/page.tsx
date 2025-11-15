"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/shop/product-card"
import CheckoutModal from "@/components/shop/checkout-modal"
import { Loader2 } from "lucide-react"

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          setProducts(data || [])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleBuyClick = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    setSelectedProduct(product)
    setQuantity(1)
    setIsCheckoutOpen(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4">
            Shop
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Browse and purchase our products</p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4" />
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-600 dark:text-cyan-400" />
          </div>
        ) : products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.image_url}
                category={product.category}
                onBuyClick={handleBuyClick}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No products available yet.</p>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false)
          setSelectedProduct(null)
          setQuantity(1)
        }}
        product={selectedProduct}
        quantity={quantity}
        onQuantityChange={setQuantity}
      />
    </main>
  )
}
