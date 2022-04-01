import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
	apiKey: 'AIzaSyBKUN5fnseZpxdvbToJtv-4BXFhBXda9_o',
	authDomain: 'fashion-cart-db.firebaseapp.com',
	projectId: 'fashion-cart-db',
	storageBucket: 'fashion-cart-db.appspot.com',
	messagingSenderId: '107288765958',
	appId: '1:107288765958:web:92b62cf199e4debe22c587',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
	prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = await doc(db, 'users', userAuth.uid)
	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef)
	console.log(userSnapshot)
	console.log(userSnapshot.exists())

	//new user
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			})
		} catch (error) {
			console.error(error)
		}
	}

	//existing user 
	
}

