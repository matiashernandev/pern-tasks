import { pool } from "../db.js"
import bcrypt from "bcrypt"

export const signin = (req, res) => res.send("ingresando")

export const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    )
    console.log(result)

    return res.json(result.rows[0])
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email is already registered" })
    }
  }
}

export const signout = (req, res) => res.send("cerrando sesion")

export const profile = (req, res) => res.send("perfil del usuario")
