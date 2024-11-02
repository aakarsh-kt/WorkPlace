import React,{useState,useEffect} from "react";
import { AddCircleOutline, AddCircleOutlineOutlined, ArrowUpwardRounded, ArrowUpwardSharp, Camera, CameraAlt, CameraAltOutlined, CameraOutdoor, Cameraswitch, CarpenterRounded, Circle, CircleNotifications, CircleOutlined, CloudCircle, ControlCamera, IosShare, Mic, MicOff, MobileScreenShare, PhotoCamera, PlayCircleFilled, RecommendRounded, RecordVoiceOver, ScreenSearchDesktopOutlined, ScreenShare, ScreenShareOutlined, ScreenShareTwoTone, Share, ShareSharp, ShareTwoTone, StarHalfRounded, StopScreenShare } from "@mui/icons-material";
import CameraIndoorSharp from "@mui/icons-material/CameraIndoorSharp";
import EmergencyShareRounded from "@mui/icons-material/EmergencyShareRounded";
import ShareLocationTwoTone from "@mui/icons-material/ShareLocationTwoTone";
import CircleRounded from "@mui/icons-material/CircleRounded";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import CloudCircleRounded from "@mui/icons-material/CloudCircleRounded";
import StopCircleTwoTone from "@mui/icons-material/StopCircleTwoTone";
export default function UserBar() {
    const [mic,setMic]=useState(false);
    const [cam,setCam]=useState(false);
    const [screen,setScreen]=useState(false);
    return (
            <div className="flex flex-row justify-around w-1/2 items-center rounded-md bg-slate-400 p-2 m-2">
            <div onClick={()=>setMic(!mic)} className={`${mic? 'bg-blue-400' : 'bg-red-300'} cursor-pointer rounded-lg p-2 m-2 ${mic?'hover:bg-blue-500 ':'hover:bg-red-400'} `}>
            {mic ? <Mic/> : <MicOff style={{color:"red"}}/>}
            </div>
            <div onClick={()=>setCam(!cam)} className={`${cam? 'bg-blue-400' : 'bg-red-300'} cursor-pointer rounded-lg p-2 m-2 ${cam?'hover:bg-blue-500 ':'hover:bg-red-400'}`}>
            {cam ? <CameraAlt/> : <CameraAlt style={{color:"red"}}/>}
            </div>
            <div onClick={()=>setScreen(!screen)} className={`${screen? 'bg-blue-400' : 'bg-red-300'} cursor-pointer rounded-lg p-2 m-2 ${screen?'hover:bg-blue-500 ':'hover:bg-red-400'}`}>
                {screen?<ScreenShare/>:<StopScreenShare/>}  
            </div>
            <div onClick={()=>setScreen(!screen)} className={`${screen? 'bg-blue-400' : 'bg-red-300'} cursor-pointer rounded-lg p-2 m-2 ${screen?'hover:bg-blue-500 ':'hover:bg-red-400'}`}>
                {screen?<PlayCircleFilled/>:<StopCircleTwoTone/>}  
            </div>

            </div>
    )
}