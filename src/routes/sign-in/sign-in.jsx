import SignUp from '../../components/sign-up/sign-up'
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

//sign in with google
const SignIn = () => {

	const logGooglePopupUser = async () => {
		const { user } = await signInWithGooglePopup()
		const userDocRef = await createUserDocumentFromAuth(user)
	}

	return (
		<>
			<h1>Sign In</h1>
			<button onClick={logGooglePopupUser}>Sign In With Google Popup</button>
			<SignUp />
		</>
	)
}

export default SignIn

