import { Request,  Response } from "express"
import {User} from '../Entities/userEntity'
import bcrypt from "bcrypt";
import AppDataSource from "../../ormconfig"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
// import nodemailer from 'nodemailer'
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

                let user = new User()
                user.firstname = firstname
                user.lastname = lastname
                user.username = username
                user.email = email
                user.password = hashedPassword
                user.id = uuidv4()
                if(username=='Admin'){
                    user.isAdmin = true
                }
                else{
                    user.isAdmin = false
                }
                // await AppDataSource.manager.save(user)
                try {
                    // let transporter = nodemailer.createTransport({
                    //     host: "smtp-mail.outlook.com",
                    //     port: 587,
                    //     secure: false, // true for 465, false for other ports
                    //     auth: {
                    //     user: "shashankBlogTest@outlook.com", // generated ethereal user
                    //     pass: "1A2A3A4A", // generated ethereal password
                    //     },
                    // });
                    // var message = {
                    //     from: "shashankBlogTest@outlook.com",
                    //     to: user.email,
                    //     subject: "Blog Account Created",
                    //     text: "Congratulations your account has been created",
                    //     html: "<p>HTML version of the message</p>"
                    // };
                    // let info = await transporter.sendMail(message)
                    // console.log("Message sent: %s", info)
                    verified = await sendConformationEmail(user)

                    if(user&&verified){
                        try {
                            await AppDataSource.manager.save(user)
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
                    



                


    }
})