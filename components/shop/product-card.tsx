"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number
  imageUrl?: string
  category?: string
  onBuyClick: (productId: string) => void
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  imageUrl,
  category,
  onBuyClick,
}: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovering ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {category && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-cyan-600/90 text-white text-xs rounded-full">
              {category}
            </div>
          )}
        </div>

        <CardHeader className="flex-grow">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">₹{price.toFixed(2)}</span>
          </div>

          <Button
            onClick={() => onBuyClick(id)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
