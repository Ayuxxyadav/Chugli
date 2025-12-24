import { useEffect ,useState } from "react";
import { WS_URL } from "../app/config";



export function useSocket(){
    const[loading , setLoading] = useState(true);
    const [socket , setSocket] = useState<WebSocket>();


    useEffect(()=>{
     const token = localStorage.getItem("token")   
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlZmVjMjJkMC04ZDIzLTQzZjUtODZjMy03NGE1OGZiYWQ0YzAiLCJpYXQiOjE3NjY1MDM1MTJ9.aENtwT9X2r2m3UuQTwRPMrTof97YlwMxiRcMRknywnQ`)
    ws.onopen = () =>{
        setLoading(false);
        setSocket(ws)
    }
    },[])

    return {
        socket,
        loading
    }

}