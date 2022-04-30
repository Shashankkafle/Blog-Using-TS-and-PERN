import {ChangeEvent, FC} from 'react'
import { useState, useEffect} from "react"
import { FaSignInAlt } from "react-icons/fa"
import {useSelector,useDispatch} from 'react-redux'
import {login,reset}  from  '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { AnyArray } from 'immer/dist/internal'

interface User{
    username:string,
    password:string
}

interface State{
    isLoading:boolean,
    isError:boolean,
    isSuccess?:boolean,
    message:string,
    user?:User
}

 const Login:FC = () => {
  const  [formData,setFormData] = useState({ 
    userName:'',
    password:'',
    })
    const  {userName,password}  = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, isLoading, isError, isSuccess, message } = useSelector(
    (state:any) => state.auth
)


    useEffect(()=>{
        if(isError){
            toast.error(message)
            console.log(message)
        }
        console.log(isSuccess||user)
        if(isSuccess||user){
            navigate('/')
        }
        dispatch(reset())
    },[isError,isSuccess,user,message,dispatch,navigate])



  const onChange= (e:ChangeEvent<HTMLInputElement>)=>{
    setFormData((prevState)=>({
         ...prevState,
         [e.target.name]: e.target.value
    }))
 }
  
  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const userData = {
            userName,
            password,
        }
        dispatch(login(userData))
 }
 
  return (
    <>
        <section className="heading">
        <h1>
            {/* <FaSignInAlt></FaSignInAlt> Login */}Login
        </h1>
        <p>Please login.</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input required type="username" className="form-control" name='userName'  id="username"  value={formData.userName} onChange={onChange}/**/ placeholder="Enter your username" />            
            </div>
            <div className="form-group">
                <input required type="password" className="form-control" name='password'  id="password"  value={formData.password} onChange={onChange} placeholder="Enter your password" />            
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-block">Submit</button>
            </div>
        </form>    
    </section>
    </>
  )
}

export default Login
