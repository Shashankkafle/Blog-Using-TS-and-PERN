import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { UserRepository } from '../Repositories/user.repository'

const  protect =  asyncHandler( async(req,res,next)=>{
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

export{protect}