import dotenv from "dotenv"
import express from 'express'
import { userRouter } from "./Routes/userRoutes"
import "reflect-metadata"
import { blogRouter } from "./Routes/blogRouter"



dotenv.config()

const PORT = process.env.PORT
console.log(typeof PORT)
// const app: Express = express()
const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use("/user", userRouter)
app.use('/blog',blogRouter)
app.listen(PORT,()=>{
    console.log(PORT)
})

