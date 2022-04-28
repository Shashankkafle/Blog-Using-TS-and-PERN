import { Router } from "express";
import { BlogController } from "../Controllers/blog.controller";
import { adminCheck, loginCheck } from "../Middlewear/authMiddlewear";
import { CategoryController } from "../Controllers/categoryController";

const categoryRouter:any = Router()

categoryRouter.post('/create-category',loginCheck,adminCheck,CategoryController.createCategory)
// categoryRouter.get('/get-category/:tokens',categoryController.getcategory)

export { categoryRouter }