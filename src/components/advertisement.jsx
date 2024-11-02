import React, { useEffect } from "react";
import { Button } from "@mui/material";
export default function Advertisement() {
   
    return (
       <div className="flex flex-col justify-center items-center ">
           <h1 className="text-6xl text-white font-bold  ">Why Link Lounge!</h1>
          <div className="flex flex-row justify-around  ">
             <div>
              <h1 className="text-2xl text-white font-bold mb-10">
                  Link Lounge is a place where you can link your workplace with your friends and colleagues. It is a place where you can share your workplace and collaborate with your colleagues.
              </h1>
              <h1 className="text-2xl text-white font-bold">
                  Link Lounge is a place where you can link your workplace with your friends and colleagues. It is a place where you can share your workplace and collaborate with your colleagues.
              </h1>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img src="/assets/advertisement.jpg" alt="logo" className="w-1/3 rounded-full " />
              </div>
          </div>
       </div>
    )
}