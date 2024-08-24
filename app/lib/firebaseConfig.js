import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDRu0bclPW_KDrl29LlYEYAkvi5A_GPymc',
  authDomain: 'xteam-3c6eb.firebaseapp.com',
  projectId: 'xteam-3c6eb',
  storageBucket: 'xteam-3c6eb.appspot.com',
  messagingSenderId: '222003579393',
  appId: '1:222003579393:web:fa5e20b78c270327c64e00'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage, app }
