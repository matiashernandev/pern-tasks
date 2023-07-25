import { pool } from "../db.js"
import bcrypt from "bcrypt"
import { createAccessToken } from "../libs/jwt.js"

export const signin = async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query("SELECT * FROM users WHERE email = $1 ", [
    email,
  ])

  if (result.rowCount === 0) {
    return res.status(400).json({ message: "Email is not registered" })
  }

  const validPasswowrd = await bcrypt.compare(password, result.rows[0].password)

  if (!validPasswowrd) {
    return res.status(400).json({
      message: "Password is invalid",
    })
  }

  const token = createAccessToken({ id: result.rows[0].id })

  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  return res.json(result.rows[0])
}

export const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    )

    const token = await createAccessToken({ id: result.rows[0].id })

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    return res.json(result.rows[0])
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email is already registered" })
    }
  }
}

export const signout = (req, res) => {}

export const profile = (req, res) => res.send("perfil del usuario")
