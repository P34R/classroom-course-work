import { Button } from '@mui/material'
import React from 'react'
import "./style.css"
import logo from "../../assets/logo.png"
import { useMyContext } from '../../context/context';
const Login = () => {
    const {login,loggedIn} = useMyContext();

    
  return (
    <div className="login">
        <img className="loginLogo" src={logo} alt="Classroom"/>
        <Button variant="contained" onClick={()=>login()}>
            Login
        </Button>
    </div>
  );
};

export default Login;