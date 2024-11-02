import React from "react";
import Game from "./Game";
import Navbar from "./components/navbar";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/login"
import Register from "./screens/Register"
import Landing from "./screens/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function(){
   return(
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Landing/>}/>
      <Route path={"/game"} element={<LandingPage/>}></Route>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/register"} element={<Register/>}/>
    </Routes>
    </BrowserRouter>
   )
}