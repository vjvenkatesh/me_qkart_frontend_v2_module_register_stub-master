import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";





const Products = () => {
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [username,setUsername] =useState("");


  useEffect(()=>{
      const storedUsername= localStorage.getItem("username")
      if (storedUsername) {
        setLoggedIn(true);
        setUsername(storedUsername);
        console.log(storedUsername);
      } else {
        setLoggedIn(false);
        setUsername("");
      }
  },[isLoggedIn])

  return (
    <div>
      <Header hasHiddenAuthButtons={isLoggedIn} username={username} >

      </Header>

       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
      <Footer />
    </div>
  );
};

export default Products;
