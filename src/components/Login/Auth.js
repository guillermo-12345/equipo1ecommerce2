
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../service/firebaseConfig"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export const Auth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken")

    if (token) {
      navigate("/protected")
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      const a = await signInWithPopup(auth, googleProvider)


      let response = await axios.post('http://localhost:3001/auth/login', {
        firebaseToken: a._tokenResponse.idToken
      })

      if (!response.data.ok) {
        console.error(response)
        logout()
      } else {
        localStorage.setItem("firebaseToken", a._tokenResponse.idToken)
      }

      navigate("/protected")
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    await signOut(auth)

    localStorage.removeItem("firebaseToken")
  }

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  )
}
