import jwt from "jsonwebtoken"

export const isAuth = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized",
    })
  }

  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: "unauthorized",
      })

    req.userId = decoded.id

    next()
  })
}
