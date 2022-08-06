const express = require("express")
const app = express()

app.use(express.json())

//Import all routes
const productRoutes = require("./routes/product")
//Import error middlewares
const errorMiddleware = require("./middlewares/errors")

app.use("/api/v1", productRoutes)
app.use(errorMiddleware)

module.exports = app