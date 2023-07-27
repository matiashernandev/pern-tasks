import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"
const app = express()

/* ------------------------------- middlewares ------------------------------ */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* --------------------------------- routes --------------------------------- */
app.get("/", (req, res) => res.json({ message: "welcome" }))
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
