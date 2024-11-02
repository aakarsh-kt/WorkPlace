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
  const style = {
    height: "80px",
  };
    const {user, setUser, clearUser} = useUserStore();
  const navigate=useNavigate();
  const Example = () => {
    const options = {
      animationData: lottie1,
      loop: true,
      autoplay: true,
    };
  
    const { View } = useLottie(options,style);
  
    return View;
  };
  const Example2 = () => {
    const options = {
      animationData: lottie2,
      loop: true,
      autoplay: true,
    };
  
    const { View } = useLottie(options,style);
  
    return View;
  };
  const [showDrawer,setShowDrawer]=useState(false);
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>setShowDrawer(false)} className="bg-slate-400 h-screen">
      <div className="flex flex-col m-2 p-2 bg-red-400">
        <div>
          {/* <image src=""/> */}
        </div>
      { user==null && <div className="flex flex-row justify-around">
        <Login/>
        <Button onClick={()=>navigate("/login")} className="text-white">Login</Button>
  

        </div>}
     { user==null  && <div className="flex flex-row justify-around">
        <AddBox/>
       <Button onClick={()=>navigate("/register")} className="text-white">Sign Up</Button>
        </div>}
      {user!=null && <div className="flex flex-row justify-around">
       <Button onClick={()=>logout()} className="text-white">Logout</Button>
      
        </div>}
      </div>
    </Box>
  );
  async function logout() {
    console.log("reached");
    setUser(undefined);
    await signOut(auth);
navigate("/");         
}
  return (
   
      <motion.div className="items-center"
      initial={{opacity:0,scale:1}}
      animate={{opacity:1,scale:1}}
      transition={{duration: 2}} 

      style={{
        // backgroundColor: 'black',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
               
      }}             
      > 
      {console.log(user)}  
        <ul className="flex w-screen  flex-row justify-around items-center  "
       
       >
        <div onClick={()=>navigate("/")} className="cursor-pointer">

         <Example  style={{width:"80px",height:"80px",marginLeft:"auto"}} />
        </div>
            <motion.li whileHover={{scale:1.35,cursor:"pointer"}}>About</motion.li>
            {/* <motion.li whileHover={{scale:1.35,cursor:"pointer"}} onClick={
              ()=>{window.open("/Akarsh_Resume.pdf",'_blank')}
            }>Resume</motion.li> */}
            <motion.li whileHover={{scale:1.35,cursor:"pointer"}}>Projects</motion.li>
        <div onClick={()=>setShowDrawer(true)} className="cursor-pointer">
         <Example2/>
  
        </div>
        {showDrawer && 
        <Drawer anchor={'right'} open={showDrawer} onClose={()=>setShowDrawer(false)} >
          { DrawerList}
          </Drawer>
        // <Example/>
          }
        </ul>
      </motion.div>
   
  )
}

export default Navbar;