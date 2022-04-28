import { Request,  Response } from "express"
import { Category } from "../Entities/categoryEnity"
import { CategoryRepository } from "../Repositories/categoryRepository"


export class CategoryController {
    static async createCategory(req:Request,res:Response){  
        const {category} = req.body
        try {
            await CategoryRepository.createAndSave(category)
            res.status(201).send("Category created.")
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('category exists')
        }
     }
}