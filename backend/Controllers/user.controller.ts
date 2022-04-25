import { Request,  Response } from "express"
import { UserRepository } from "../Repositories/user.repository"
import AppDataSource from "../../ormconfig"

export class UserController {
    static async createuser(req:Request,res:Response){
       const user = UserRepository.createAndSave(req, res)
       
    }
}
// export class UserController {
//     users(req:Request,res:Response) {
//         return UserRepository.createAndSave(req,res)
//     }
// }
// module.exports = {
//     UserController
// }    