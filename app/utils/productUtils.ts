import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore'
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage'
import { app } from '../lib/firebaseConfig'
import { Product } from '../types/index'

const db = getFirestore(app)
const storage = getStorage(app)

// Fetch all products from Firestore
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      tags: Array.isArray(doc.data().tags) ? doc.data().tags : []
    })) as Product[]
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Add a product to Firestore
export const addProduct = async (product: Omit<Product, 'id'>, image: File): Promise<void> => {
  const storageRef = ref(storage, `products/${image.name}`)
  await uploadBytes(storageRef, image)
  const imageUrl = await getDownloadURL(storageRef)

  // Convert tags string to array if it's a string
  const tagsArray =
    typeof product.tags === 'string' ? product.tags.split(',').map((tag: string) => tag.trim()) : product.tags

  await addDoc(collection(db, 'products'), {
    ...product,
    tags: tagsArray,
    imageUrl,
    createdAt: new Date()
  } as Partial<Product>)
}

// Update a product in Firestore
export const updateProduct = async (product: Product, newImage?: File): Promise<Product> => {
  const productRef = doc(db, 'products', product.id!)

  if (newImage) {
    const oldImageRef = ref(storage, product.imageUrl ?? '')
    await deleteObject(oldImageRef).catch(() => {
      console.warn('Old image not found, skipping deletion')
    })

    const newImageRef = ref(storage, `products/${newImage.name}`)
    await uploadBytes(newImageRef, newImage)
    const newImageUrl = await getDownloadURL(newImageRef)

    product.imageUrl = newImageUrl
  }

  await updateDoc(productRef, product as Partial<Product>)
  return product
}

// Delete a product from Firestore and its image from Storage
export const deleteProduct = async (product: Product): Promise<void> => {
  const productRef = doc(db, 'products', product.id!)
  if (product.imageUrl) {
    const imageRef = ref(storage, product.imageUrl)
    await deleteObject(imageRef).catch(() => {
      console.warn('Image not found, skipping deletion')
    })
  }
  await deleteDoc(productRef)
}
