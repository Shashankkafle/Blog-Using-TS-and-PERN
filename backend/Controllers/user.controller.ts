import { Request,  Response } from "express"
import { UserRepository } from "../Repositories/user.repository"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export class UserController {
    static async createuser(req:Request,res:Response){  //everything done in repo bring tasks unrelated to db here
       const user = UserRepository.createAndSave(req, res)
       
    }
    static async confirmEmail(req:Request,res:Response){
        const user = UserRepository.setConformaion(req, res)
        
     }
    static async login(req:Request,res:Response){
      const {username,password} = req.body
      try {
        const  user = await UserRepository.retrieveUsingId(username) //any is a workaround learn what is to be done
         const id:any = user?.id
         const token:string = await generateToken(id)
         if(user?.emailConformaton&&(await bcrypt.compare(password,user.password)))
            {res.status(200).json({
            id:id,
            firstName:user?.firstname,
            lastName:user?.lastname,
            email:user?.email,
            username:user?.username,
            token:token         
         })}
         else{
            res.status(400).send("Unverified email or incorrect password")
         }
      } catch (error) {
         console.log(error)
         res.status(404).send("User not registered.")        
      }
      
    } 
}

const generateToken = (id:string)=>{
    return jwt.sign({id}, "555",{
        expiresIn:'30d',
    })
 }    