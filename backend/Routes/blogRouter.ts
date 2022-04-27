import { Router, Request, Response } from "express";
import { BlogController } from "../Controllers/blog.controller";
import { protect } from "../Middlewear/authMiddlewear";

const blogRouter:any = Router()

blogRouter.post('/post-blog',protect,BlogController.createBlog)
// blogRouter.get('/get-blog/:tokens',BlogController.getBlog)

export { blogRouter }