import { Router, Request, Response } from "express";
import { UserController } from "../Controllers/user.controller";

const router:any = Router()
// router.post('/register',UserController.users()
// )
// router.post('/register',UserController.createuser)
router.post('/register',UserController.createuser)
export { router }