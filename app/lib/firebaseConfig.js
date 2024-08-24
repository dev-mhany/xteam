import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBbZ4HfDIs9jO3Myw6nIkz910mIcpjOuz8',
  authDomain: 'xteam-2ca4f.firebaseapp.com',
  projectId: 'xteam-2ca4f',
  storageBucket: 'xteam-2ca4f.appspot.com',
  messagingSenderId: '1045437453296',
  appId: '1:1045437453296:web:0af6f5c194ac426af38335',
  measurementId: 'G-G14TJ0EM88'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage, app }
