const express = require("express")
const app = express()

app.use(express.json())

//Import all routes
const productRoutes = require("./routes/product")

app.use("/api/v1", productRoutes)

module.exports = app