import axios from "../api/axios"
import { createContext, useEffect, useState } from "react"
import Cookie from "js-cookie"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [errors, setErrors] = useState(null)

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
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data)
          setIsAuth(true)
        })
        .catch((err) => {
          console.log(err)
          setUser(null)
          setIsAuth(false)
        })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isAuth, errors, signup, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
