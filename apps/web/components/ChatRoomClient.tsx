"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket"


export function ChatRoomClient({messages,id}:{

    messages:{message:string}[],
    id:string
}){
    const [chats,setChats] = useState(messages)
     const {socket,loading} = useSocket();
     const [currentMessage,setCurrentMessage] = useState("");

     useEffect(()=>{
        if(socket && !loading){

             socket.send(JSON.stringify({
                type : "join_room",
                roomId : id
             }))

            socket.onmessage = (event)=>{
             const parsedData = JSON.parse(event.data) //websocket ya to binary ma hota h ya json format main 
             if(parsedData.type === "chat"){
               setChats(c=> [...c,{message:parsedData.message}])
             }
            }
        }
     },[socket,loading,id])

     return <div>
        {
            chats.map((m)=><div>{m.message}</div>)
        }

        <input type="text" 
        value={currentMessage}
        onChange={(e)=>
           setCurrentMessage(e.target.value)  
        } />
         <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                roomId :id,
                message: currentMessage
            }))
            setCurrentMessage("")
          }}
        >
          Send Message
        </button>
        
     </div>
}