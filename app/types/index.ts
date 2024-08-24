export interface Product {
  id?: string
  name: string
  price: string
  category: string
  vendor: string
  type: string
  tags: string | string[]
  description: string
  deviceType: string
  stock: string
  imageUrl?: string
  createdAt?: Date
}
