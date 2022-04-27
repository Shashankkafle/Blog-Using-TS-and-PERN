import { Request,  Response } from "express"
import { UserRepository } from "../Repositories/user.repository"
import { sendResetEmail } from "../../emailHandler"
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
        const  user = await UserRepository.retrieveUsingUsername(username) //any is a workaround learn what is to be done
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
   static async changePassword(req:Request,res:Response){
      const {username,password,newPassword} = req.body
      try {
         const  user = await UserRepository.retrieveUsingUsername(username) 
         if(user&&(await bcrypt.compare(password,user.password))) {
            UserRepository.changePassword(username,newPassword)
            res.status(200).send("Pawssword change successful")
         }
         else{
            res.status(400).send("Invalid password or username")
         }
       } catch (error) {
          console.log(error)
          res.status(404).send("User not found.")        
       }
   }
   static async  resetPasswordRequest(req:Request,res:Response){
      const {username} = req.body
      console.log(username)
      let  user:any     //any is a workaround learn what is to be done
      try {
         user = await UserRepository.retrieveUsingUsername(username)
         if(user){
            sendResetEmail(user)
            res.status(200).send("Reset email sent")
         }
         else{
            res.status(404).send('User not found.')
         }
         console.log(user)
      } catch (error) {
         console.log(error)
         res.status(500).send("Could not send email.")
      }
   }
   static async resetPassword(req:Request,res:Response){
      const payload:any=await jwt.verify(req.params.tokens.toString(), '555')
      if(payload){
        const {newPassword} = req.body
        try {
         const user:any= await UserRepository.retrieveUsingId(payload.user)
         UserRepository.changePassword(user.username,newPassword)
         res.status(201).send("Password changed successsfuly")
        } catch (error) {
           res.status(400).send("unsble to change password or find user")
        }
         
         
        
      }
      else{
         res.status(400).send("Invalid information")
      }

   }


}

const generateToken = (id:string)=>{
    return jwt.sign({id}, "555",{
        expiresIn:'30d',
    })
 }   

