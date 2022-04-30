import {createSlice,createAsyncThunk}  from '@reduxjs/toolkit'
import authService from './authService'
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
const userJSON:any = localStorage.getItem('user') //type string|null
const user = JSON.parse(userJSON)
const  initialState={
    user: user ? user : null,
    isError: 'false',
    isLoading: 'false',
    message: '',
}

export const register = createAsyncThunk('auth/regster', async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    }catch(error:any){ //what  will bw type here?
        const message = (error.response && error.response.data && error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})


export const login = createAsyncThunk('auth/login', async(user:any,thunkAPI)=>{
    try {
        return await authService.login(user)
    }catch(error:any){
        const message = (error.response && error.response.data && error.response.data.message)||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

//logout
export const logout = createAsyncThunk('auth/logout',async()=>{
    await authService.logout()

})


export const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state:any) =>{       //sate gave problems
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(register.pending, (state:any) =>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state:any,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user  = action.payload
            })    
            .addCase(register.rejected,(state:any,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user  = null
            }) 
            .addCase(logout.fulfilled,(state)=>{
                state.user = null
            })   
            .addCase(login.pending, (state:any) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state:any,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user  = action.payload
            })    
            .addCase(login.rejected,(state:any,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user  = null
            }) 
    },
})

export const {reset} = authSlice.actions

export default authSlice.reducer
