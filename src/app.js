import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
import { pool } from "./db.js"
import { ORIGIN } from "./config.js"
const app = express()

/* ------------------------------- middlewares ------------------------------ */
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
)
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* --------------------------------- routes --------------------------------- */
app.get("/api/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()")
  res.json(result.rows[0])
})

app.get("/", (req, res) =>
  res.json({ message: "Welcome Matías Hernán Arroyo" })
)
app.use("/api", taskRoutes)
app.use("/api", authRoutes)

/* ------------------------------ error handler ----------------------------- */
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  })
})

export default app
