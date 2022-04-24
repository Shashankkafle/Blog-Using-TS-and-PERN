import dotenv from "dotenv"
import express from 'express'
import { router } from "./Routes/userRoutes";

dotenv.config()

const PORT:string = process.env.PORT||'5000'

// const app: Express = express()
const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use("/", router);
app.listen(PORT,()=>{
    console.log(PORT)
})

