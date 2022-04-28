import { Request,  Response } from "express"
import {User} from '../Entities/userEntity'
import bcrypt from "bcrypt"
import AppDataSource from "../../ormconfig"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
import { sendConformationEmail } from "../../emailHandler";
import dotenv from "dotenv"
dotenv.config()

export const UserRepository = AppDataSource.getRepository(User).extend({
    async createAndSave(req:Request,res:Response){
        const {username,email,password,firstname,lastname} = req.body
        let verified

        if(!username||!email||!password){
            res.status(400)
            throw new Error('Please include all fields.')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log("User: ")
                let user = new User()
                user.firstname = firstname
                user.lastname = lastname
                user.username = username
                user.email = email
                user.password = hashedPassword
                user.id = uuidv4()
                user.emailConformaton = false
                if(username=='Admin'){
                    user.isAdmin = true
                }
                else{
                    user.isAdmin = false
                }
                console.log(user)

                try {
                   
                    verified = await sendConformationEmail(user)

                    if(user&&verified){
                        try {
                            await User.save(user)
                        } catch (error) {
                            console.log(error)
                            throw new Error('Couldnot store user to database')
                            
                        }
                        res.status(201).json({
                            firstname:user.firstname,
                            lastname:user.lastname,
                            email:user.email,
                            id:user.id,
                            username:user.username
                        })
                    }
                    
                    
                } catch (error) {
                    console.log(error)
                    throw new Error('Unable to send email.')
                }

    },
    async setConformaion(req:Request,res:Response){
        console.log(req.params.tokens)
        try {
            const payload:any=await jwt.verify(req.params.tokens.toString(), '555')
            const currentId:string = payload.user
            const currentUser:any = await User.findOneBy({
                id: currentId
            })
            currentUser.emailConformaton = true
            await User.save(currentUser)
            // res.redirect('/login');
            
        } catch (error) {
            console.log(error)
            throw new Error("Token verification failed")
            
        }

    
    },

    async retrieveUsingUsername(username:string){
      
            const currentUser = await User.findOneBy({
                username: username
            })
            return  currentUser                   
        
    },
    async retrieveUsingId(id:string){
      
            const currentUser = await User.findOneBy({
                id: id
            })
            return  currentUser                   
        
    },
    async changePassword(username:string,newPassword:string){
        const currentUser:any = await User.findOneBy({
            username: username
        })
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        currentUser.password = hashedPassword
        await User.save(currentUser)
    }
})


