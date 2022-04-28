import {Blog} from '../Entities/blogEntity'
import AppDataSource from "../../ormconfig"
import { Category } from '../Entities/categoryEnity'

export const CategoryRepository = AppDataSource.getRepository(Category).extend({
    async createAndSave(categoryName:string){
        const category = new Category()
        category.name = categoryName
        this.save(category)
    },
    async retrieveUsingName(name:string){
      
        const currentCategory = await Category.findOneBy({
            name: name
        })
        return  currentCategory       
    }               
    

})