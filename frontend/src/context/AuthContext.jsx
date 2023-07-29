import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)

  const signin = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/signin", data, {
        withCredentials: true,
      })
      setUser(res.data)
      setIsAuth(true)

      return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data.message])
    }
  }

  const signup = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", data, {
        withCredentials: true,
      })
      setUser(res.data)
      setIsAuth(true)

      return res.data
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }

      setErrors([error.response.data.message])
    }
  }

  useEffect(() => {}, [])

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, signin }}>
      {children}
    </AuthContext.Provider>
  )
}
