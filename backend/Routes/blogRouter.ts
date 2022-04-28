import { Router, Request, Response } from "express";
import { BlogController } from "../Controllers/blog.controller";
import { loginCheck } from "../Middlewear/authMiddlewear";

const blogRouter:any = Router()

blogRouter.post('/post-blog',loginCheck,BlogController.createBlog)
// blogRouter.get('/get-blog/:tokens',BlogController.getBlog)

export { blogRouter }