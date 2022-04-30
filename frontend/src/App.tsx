import { useState, FC } from "react";
import Header from "./components/Header";
import {BrowserRouter as Router,Routes,Route, Link} from 'react-router-dom'
import Home from "./pages/Home";
import  Login  from "./pages/Login";
import Register from "./pages/Register";



const App:FC =() => {
  return (
    <Router>
      <Header/>
    <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/register' element={<Register/>}/> 
    </Routes>
</Router>
  );
}

export default App;
