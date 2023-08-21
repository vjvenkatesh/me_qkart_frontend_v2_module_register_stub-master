import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";


import {useHistory} from 'react-router-dom'


const Header = ({ children, hasHiddenAuthButtons,username }) => {

  const history=useHistory();

  const logoutHandle=()=>{
    localStorage.clear();
    history.push("/");
    window.location.reload();
  }

  const loginHandle=()=>{
    history.push("/login");
  }
  const RegisterHandle=()=>{
    history.push("/register");
  }

  const backToProductHandle=()=>{
    history.push("/");
  }

  const fromProductLoggedIn=()=>{
    if(hasHiddenAuthButtons === true){
        return (<Stack direction="row" alignItems={"center"} spacing={2}><Avatar alt={username} src="avatar.png" /><p>{username}</p> 
        <Button
        className="explore-button"
        variant="text"
        onClick={logoutHandle}
      >
        Logout
      </Button></Stack>)
    }
    else if(hasHiddenAuthButtons === false){
      return (<Stack direction="row" spacing={2}><Button
      className="explore-button"
      variant="text"
      onClick={loginHandle}
    >
      Login
    </Button>
    <Button
    className="button"
    variant="contained"
    onClick={RegisterHandle}
  >
    Register
  </Button></Stack>)
    }

  else if(children == "login" || children == "register"){
    return (<Button
      className="explore-button"
      startIcon={<ArrowBackIcon />}
      variant="text"
      onClick={backToProductHandle}
    >
      Back to explore
    </Button>)
  }
  }


    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {fromProductLoggedIn()}
          
      </Box>
    );
};

export default Header;
