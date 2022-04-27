import { Request,  Response } from "express"
import { BlogRepository } from "../Repositories/blog.Repository"


export class BlogController {
    static async createBlog(req:Request,res:Response){  
        const {user, title, content} = req.body
        try {
            await BlogRepository.createAndSave(user, title, content)
            res.status(201).send("Blog created.")
        } catch (error) {
            console.log(error)
            res.status(400).send('Invalid user or title taken')
        }
     }
}