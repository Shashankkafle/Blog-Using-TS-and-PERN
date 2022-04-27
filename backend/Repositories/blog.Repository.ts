import { Request,  Response } from "express"
import {Blog} from '../Entities/blogEntity'
import AppDataSource from "../../ormconfig"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
import { sendConformationEmail } from "../../emailHandler";
import dotenv from "dotenv"
import { User } from "../Entities/userEntity"
dotenv.config()

export const BlogRepository = AppDataSource.getRepository(Blog).extend({
    async createAndSave(user:User, title:string, content:string){
        const blog = new Blog()
        blog.user = user
        blog.title = title
        blog.content = content
        this.save(blog)
    }
})