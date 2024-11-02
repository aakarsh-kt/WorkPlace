import React,{useState,useEffect} from "react"; 
import {motion} from "framer-motion";
import { useLottie } from "lottie-react";
import lottie1 from "../assets/lottie1.json";
import lottie2 from "../assets/lottieProfile.json";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail'
import useUserStore from "./useUserStore";
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Add, AddBox, Login, LoginOutlined, PlusOne, SignpostOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
const Navbar = () => {
  
  const {user, setUser, clearUser} = useUserStore();
  const navigate=useNavigate();

  function navigateLogin() {
    if(!user)
    navigate("/login");
    else 
    navigate("/game");
   
  }
  function navigateRegister() {
    if(!user)
    navigate("/register");
    else 
    navigate("/game");
   
  }
  return (
   
      <div className="flex flex-row justify-between " > 
      {console.log(user)}  
        <ul className="flex w-screen  flex-row justify-around items-center  "
       
       >
        <div className="ml">
            <img src="/assets/logo2.png" alt="logo" className="w-72 "/>
        </div>
       <div className="flex flex-row justify-between gap-4 items-center">
            <Button onClick={navigateRegister} variant="contained" color="warning" className="text-white">Get Started</Button>
    
            <Button onClick={navigateLogin} variant="contained" color="info" className="text-white">Login</Button>
         </div>
    
        </ul>
      </div>
   
  )
}

export default Navbar;