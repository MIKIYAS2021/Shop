const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cookieParser())
//Import all routes
const productRoutes = require("./routes/product")
const userRoutes = require("./routes/auth")
//Import error middlewares
const errorMiddleware = require("./middlewares/errors")

app.use("/api/v1", productRoutes)
app.use("/api/v1", userRoutes)
app.use(errorMiddleware)

module.exports = app