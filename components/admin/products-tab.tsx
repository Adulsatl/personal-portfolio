"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import ProductModal from "./product-modal"
import { fetchProducts, saveProduct, deleteProduct } from "@/lib/product-actions"
import { useToast } from "@/hooks/use-toast"

export default function ProductsTab() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProductsData()
  }, [])

  const fetchProductsData = async () => {
    setIsLoading(true)
    try {
      const result = await fetchProducts()
      if (result.success) {
        setProducts(result.data)
      } else {
        toast({ title: "Error", description: "Failed to load products", variant: "destructive" })
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast({ title: "Error", description: "Failed to load products", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const result = await deleteProduct(id)
      if (result.success) {
        setProducts(products.filter((p) => p.id !== id))
        toast({ title: "Success", description: "Product deleted successfully" })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete product",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" })
    }
  }

  const handleSave = async (productData: any) => {
    try {
      const result = await saveProduct(productData, editingProduct?.id)
      if (result.success) {
        fetchProductsData()
        setIsModalOpen(false)
        setEditingProduct(null)
        toast({ title: "Success", description: "Product saved successfully" })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to save product",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving product:", error)
      toast({ title: "Error", description: "Failed to save product", variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your shop products</CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-4 font-medium">Title</th>
                  <th className="text-left py-2 px-4 font-medium">Price</th>
                  <th className="text-left py-2 px-4 font-medium">Stock</th>
                  <th className="text-left py-2 px-4 font-medium">Status</th>
                  <th className="text-left py-2 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{product.stock_quantity}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(product)
                          setIsModalOpen(true)
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No products yet. Create your first product to get started.</p>
          </div>
        )}
      </CardContent>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(null)
        }}
        product={editingProduct}
        onSave={handleSave}
      />
    </Card>
  )
}
