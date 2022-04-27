import { Router, Request, Response } from "express";
import { BlogController } from "../Controllers/blog.controller";

const blogRouter:any = Router()

blogRouter.post('/post-blog',BlogController.createBlog)
// blogRouter.get('/get-blog/:tokens',BlogController.getBlog)

export { blogRouter }