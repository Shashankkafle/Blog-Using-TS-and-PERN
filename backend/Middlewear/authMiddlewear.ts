import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { UserRepository } from '../Repositories/user.repository'

const  loginCheck =  asyncHandler( async(req,res,next)=>{
    let token  
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer'))){ 
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded:any = jwt.verify(token,'555')
            const user = await UserRepository.retrieveUsingId(decoded.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(400)
        throw new Error('Not Authorized')
    }

})
const  adminCheck =  asyncHandler( async(req,res,next)=>{
    let token  
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer'))){ 
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded:any = jwt.verify(token,'555')
            const user = await UserRepository.retrieveUsingId(decoded.user)
            if(!user?.isAdmin){
                res.status(400)
            throw new Error('Not Authorized')
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(400)
        throw new Error('Not Authorized')
    }

})

export{loginCheck,adminCheck}