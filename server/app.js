import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import authRoute from "./routes/authRoutes.js"
import userRoute from "./routes/userRoute.js"
const PORT= process.env.PORT || 4000

const app = express()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())

mongoose.connect(process.env.MONGO_URI)
.then((suc) =>{
    console.log(`Connected`)
})
.catch((error) =>{
    console.log(error)
})

app.use("/auth", authRoute)
app.use("/user", userRoute)

app.listen(PORT, () =>{
    console.log(`Server Started At ${PORT}`)
})