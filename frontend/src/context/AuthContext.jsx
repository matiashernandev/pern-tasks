import axios from "axios"
import { createContext, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)

  const signup = async (data) => {
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCredentials: true,
    })
    setUser(res.data)
  }

  const signin = async (data) => {
    const res = await axios.post("http://localhost:3000/api/signin", data, {
      withCredentials: true,
    })
    setUser(res.data)
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, signin }}>
      {children}
    </AuthContext.Provider>
  )
}
