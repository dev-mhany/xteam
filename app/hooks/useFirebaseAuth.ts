import { useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth'
import { auth } from '../lib/firebaseConfig' // Adjust the import path if necessary

interface UseFirebaseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  handleEmailSignIn: (email: string, password: string) => Promise<boolean>
  handleGoogleSignIn: () => Promise<void>
  handleSignOut: () => Promise<void>
}

export const useFirebaseAuth = (): UseFirebaseAuthReturn => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setLoading(true)
        const result = await getRedirectResult(auth)
        if (result?.user) {
          setUser(result.user)
          localStorage.setItem('accessToken', await result.user.getIdToken())
        }
      } catch (error: any) {
        console.error('Error handling redirect result:', error)
        setError('Failed to sign in with Google. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    checkRedirectResult()
  }, [])

  const handleEmailSignIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      localStorage.setItem('accessToken', await userCredential.user.getIdToken())
      return true
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithRedirect(auth, provider)
    } catch (error: any) {
      console.error('Google Sign-In Error:', error)
      setError('Failed to sign in with Google. Please try again.')
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setUser(null)
      localStorage.removeItem('accessToken')
    } catch (error) {
      console.error('Error during sign out:', error)
      setError('Failed to sign out. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, error, handleEmailSignIn, handleGoogleSignIn, handleSignOut }
}
