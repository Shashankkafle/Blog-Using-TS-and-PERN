import { Request,  Response } from "express"
import {User} from '../Entities/userEntity'
import bcrypt from "bcrypt";
import AppDataSource from "../../ormconfig"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'





export const UserRepository = AppDataSource.getRepository(User).extend({
    async createAndSave(req:Request,res:Response){
        const {username,email,password,firstname,lastname} = req.body

        if(!username||!email||!password){
            res.status(400)
            throw new Error('Please include all fields.')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const token = jwt.sign({username},'555',{expiresIn:'30d'})
        try {
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

        } catch (error) {
            console.log(error)
            console.log('user creation failed')
        }

    }
})