import axios from "../api/axios"
import { createContext, useEffect, useState } from "react"
import Cookie from "js-cookie"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  const signin = async (data) => {
    try {
      const res = await axios.post("/signin", data)
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
      const res = await axios.post("/signup", data)
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

  const signout = async () => {
    await axios.post("/signout")

    setUser(null)
    setIsAuth(false)
  }

  useEffect(() => {
    setLoading(true)
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data)
          setIsAuth(true)
        })
        .catch((err) => {
          console.error(err)
          setUser(null)
          setIsAuth(false)
        })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null)
    }, 5000)
    return () => clearTimeout(clean)
  }, [errors])

  return (
    <AuthContext.Provider
      value={{ user, isAuth, errors, signup, signin, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
