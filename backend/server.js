const app = require("./app")

const databaseConnect = require("./config/database")

const dotenv = require("dotenv")

//setting up config file
dotenv.config({path: "backend/config/config.env"})


databaseConnect()
app.listen(process.env.PORT, () => {
    console.log("Server is running: "+process.env.PORT + " in "+ process.env.NODE_ENV+" mode")
})