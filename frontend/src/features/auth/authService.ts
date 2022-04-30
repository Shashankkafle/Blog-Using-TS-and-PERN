import axios from 'axios'

const API_URL = '/api/users'

//Register users

const register   = async (userData:any )=> {
    const response = await axios.post(API_URL+'/register',userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
   return response.data
}
const logout = () => localStorage.removeItem('user')

const login = async(userData:object) => {
    const response = await axios.post(API_URL+'/login',userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
}


const authService = {
    register,
    logout,
    login
} 

export default authService

   