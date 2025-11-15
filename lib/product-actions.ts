"use server"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

async function getAdminClient() {
  const cookieStore = await cookies()
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Handle error if cookies cannot be set
        }
      },
    },
  })
}

export async function fetchProducts() {
  try {
    const supabase = await getAdminClient()
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, data: [], error: String(error) }
  }
}

export async function saveProduct(productData: any, productId?: string) {
  try {
    const supabase = await getAdminClient()

    if (productId) {
      const { error } = await supabase.from("products").update(productData).eq("id", productId)

      if (error) throw error
      return { success: true }
    } else {
      const { error } = await supabase.from("products").insert([productData])

      if (error) throw error
      return { success: true }
    }
  } catch (error) {
    console.error("Error saving product:", error)
    return { success: false, error: String(error) }
  }
}

export async function deleteProduct(productId: string) {
  try {
    const supabase = await getAdminClient()
    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: String(error) }
  }
}
