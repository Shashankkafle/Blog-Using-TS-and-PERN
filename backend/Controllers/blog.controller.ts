import { Request,  Response } from "express"
import { Category } from "../Entities/categoryEnity"
import { BlogRepository } from "../Repositories/blog.Repository"
import { CategoryRepository } from "../Repositories/categoryRepository"


export class BlogController {
    static async createBlog(req:Request,res:Response){  
        const {user, title, content,category} = req.body
        const catArr = category.split(',')
        var catObjArr = new Array()
        for(let item of catArr){
            try {   
                    const catObj = CategoryRepository.retrieveUsingName(item)
                    catObjArr.push(catObj)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            await BlogRepository.createAndSave(user, title, content,catObjArr)
            res.status(201).send("Blog created.")
        } catch (error) {
            console.log(error)
            res.status(400).send('Invalid user or title taken')
        }
     }
}