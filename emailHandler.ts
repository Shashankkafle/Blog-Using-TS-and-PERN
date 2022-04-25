import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {User} from './backend/Entities/userEntity'
 
dotenv.config()

const senderEmail = process.env.EMAIL
const senderPassword = process.env.EMAL_PW
const secret = process.env.JWT_SECRET

let transporter = nodemailer.createTransport({
                        host: "smtp-mail.outlook.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                        user: "shashankBlogTest@outlook.com", // generated ethereal user
                        pass: "1A2A3A4A", // generated ethereal password
                        },
                    });

export async function sendConformationEmail(user:User){
try {
    const emailToken = jwt.sign(
        {
            user:user.id
        },
        '555' ,
        {
            expiresIn: '1d'
        }
    )
    const url = `http://localhost:5000/conformation/${emailToken}`

    let info = await transporter.sendMail({
        from: senderEmail,
        to: user.email,
        subject: "Please confirm your email account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${user.firstname}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${url}>${url}</a>
            </div>`,
      });
    
} catch (error) {
    console.log(error)
    throw new Error('Email conformation failed.')
}
return(true)


}
