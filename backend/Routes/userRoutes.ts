import { Router, Request, Response } from "express";
import { UserController } from "../Controllers/user.controller";

const userRouter:any = Router()
// router.post('/register',UserController.users()
// )
// router.post('/register',UserController.createuser)
userRouter.post('/register',UserController.createuser)
userRouter.get('/confirmation/:tokens',UserController.confirmEmail)
userRouter.post('/login',UserController.login)
userRouter.post('/change-pw',UserController.changePassword)
userRouter.post('/reset-pw',UserController.resetPasswordRequest)
userRouter.get('/reset-pw/:tokens',UserController.resetPassword)

export { userRouter }