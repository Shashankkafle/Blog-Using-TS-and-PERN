import { Router, Request, Response } from "express";
import { UserController } from "../Controllers/user.controller";

const router:any = Router()
// router.post('/register',UserController.users()
// )
// router.post('/register',UserController.createuser)
router.post('/register',UserController.createuser)
router.get('/confirmation/:tokens',UserController.confirmEmail)
router.post('/login',UserController.login)
router.post('/change-pw',UserController.changePassword)
router.post('/reset-pw',UserController.resetPasswordRequest)
router.get('/reset-pw/:tokens',UserController.resetPassword)

export { router }