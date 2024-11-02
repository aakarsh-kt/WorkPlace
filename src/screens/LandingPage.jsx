import React from "react";
import Game from "../Game";
import Navbar from "../components/navbar";
import useUserStore from "../components/useUserStore";
import UserBar from "../components/userBar";
export default function(){
    const [join,setJoin]=React.useState(false);
    const {user,setUser,clearUser}=useUserStore();
    // Create a WebSocket connection to the server


    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <Navbar/>
            {console.log(user)}
            <button onClick={()=>setJoin(!join)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Join</button>
            {join && <Game user={user.uid}/>}
            <UserBar/>
        </div>
    )
}