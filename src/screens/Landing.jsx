import React from "react";
import Navbar from "../components/navbarHome";
import useUserStore from "../components/useUserStore";
import Advertisement from "../components/advertisement";
import Workspaces from "../components/workspaces";
export default function(){
    const {user,setUser,clearUser}=useUserStore();
    return (
        <div className="flex flex-col items-center justify-start h-screen w-screen">
            

            <Navbar/>
         
            <Advertisement/>
            {/* <Workspaces/> */}
          
        </div>
    )
}
