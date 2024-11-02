import React,{useState,useEffect} from "react";
import useUserStore from "./useUserStore";
import {db} from "../Firebase";
import { Button } from "@mui/material";

export default function Workspaces() {
    const {user,setUser,clearUser}=useUserStore();
    const [workspaces,setWorkspaces]=useState([]);
    useEffect(()=>{
        if(user){

            setWorkspaces([
                {name:"Office",id:"1"},
                {name:"Muzer",id:"2"},
                {name:"KB CloudTech",id:"3"}
            ])
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-6xl text-white font-bold mt-40 gap-10">Workspaces</h1>
            {workspaces.map((workspace)=>(
                <div className="flex flex-row justify-between items-center gap-10 w-1/2 m-10">
                    <h1 className="text-2xl text-white font-bold">{workspace.name}</h1>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400">Join</button>
                </div>
            ))}
            <div className="flex flex-row justify-between items-center gap-10 w-1/2 m-10">
            <Button variant="contained" color="primary" className="text-white">Create Workspace</Button>
            <Button variant="contained" color="secondary" className="text-white">Join Workspace</Button>
            </div>
        </div>
    )
}