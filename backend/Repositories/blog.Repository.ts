import {Blog} from '../Entities/blogEntity'
import AppDataSource from "../../ormconfig"
import dotenv from "dotenv"
import { User } from "../Entities/userEntity"
import { Category } from '../Entities/categoryEnity'
dotenv.config()

export const BlogRepository = AppDataSource.getRepository(Blog).extend({
    async createAndSave(user:User, title:string, content:string,categoryArray:Category[]){
        const blog = new Blog()
        blog.user = user
        blog.title = title
        blog.content = content
        blog.categories = categoryArray
        this.save(blog)
    }
})