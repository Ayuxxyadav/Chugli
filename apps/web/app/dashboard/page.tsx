"use client";
import React, { useEffect, useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { 
  PlusCircle, 
  LogIn, 
  History, 
  Trash2, 
  MessageSquare, 
  Hash, 

} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";


interface Room {
  id: number | string;
  slug: string;
  adminId: string;

}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const router = useRouter()
  const [createRoom , setcreateRoom] = useState("");
  const [allRooms,setAllRooms] = useState<Room[]>([]);
  const [roomId,setRoomId] = useState("")




  const [copiedId, setCopiedId] = useState<string | null>(null);

const handleCopy = (id: string) => {
  navigator.clipboard.writeText(id);
  setCopiedId(id);
  
  // 2 second baad feedback hata dein
  setTimeout(() => setCopiedId(null), 2000);
};



    const fetchAllRoomData = async () => {
           const token = localStorage.getItem("token")
            if(!token){return router.push("/signup")}
            const res = await axios.get(`${BACKEND_URL}/allrooms`,{
            headers:{
                Authorization:token
            }
        });
        setAllRooms(res.data.allRooms)

    } 

useEffect(() => {
  fetchAllRoomData();
}, []);
    
    async function handleCreateRoom(){
    const token = localStorage.getItem("token")

    const res = await axios.post(`${BACKEND_URL}/room`,
        {
            name:createRoom
        },{
            headers:{
                Authorization:`${token}`
            }
        }
    )
    fetchAllRoomData()
  }



   


  return (
    <div className="flex min-h-screen py-25 bg-zinc-950 text-zinc-200">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 backdrop-blur-xl p-6 flex flex-col gap-8">


        <nav className="flex flex-col py-20 gap-2">
          <button 
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "create" ? "bg-blue-600 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
          >
            <PlusCircle size={18} />
            <span className="text-sm font-medium">Create Room</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("join")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "join" ? "bg-blue-600 text-white" : "hover:bg-zinc-800 text-zinc-400"}`}
          >
            <LogIn size={18} />
            <span className="text-sm font-medium">Join Room</span>
          </button>
        </nav>

        <div className="mt-auto p-4 rounded-2xl bg-zinc-800/40 border border-zinc-700/50">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Pro Tip</p>
          <p className="text-xs text-zinc-400 leading-relaxed">Share Room IDs only with people you trust.</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "create" ? (
            <motion.div 
              key="create-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl"
            >
              <h1 className="text-3xl font-bold text-white mb-2 italic">Create Room</h1>
              <p className="text-zinc-500 mb-8">Start a new private conversation space.</p>




              <div className="flex gap-4 mb-12">
                <input 
                  type="text" 
                  placeholder="Enter room name..." 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                  value={createRoom} 
                  onChange={(e)=>
                    {setcreateRoom(e.target.value)}
                }
                />
                <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all"
                onClick={()=>{handleCreateRoom(),setcreateRoom("")}
                
                }
                >
                  Create
                </button>
              </div>


 <div className="mt-8 space-y-4">
  <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">
    <History size={16} className="text-blue-500" />
    Previously Created
  </h2>

  {/* SCROLL BOX START */}
  <div className="relative w-full rounded-3xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-xl overflow-hidden shadow-2xl">
    <div className="max-h-[500px] overflow-y-auto p-4 space-y-3 custom-scrollbar">
      
      {allRooms && allRooms.length > 0 ? (
        allRooms.map((room) => (
          <div
          //@ts-ignore
            key={room.id}
            className="group relative flex items-center justify-between p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl hover:border-blue-500/20 hover:bg-zinc-800/40 transition-all duration-300"
          >





<div className="flex items-center gap-4">
  {/* Room Icon */}
  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
    <Hash size={20} />
  </div>

  <div>
    <h3 className="text-md font-bold text-white italic tracking-tight uppercase">
     
      { room.slug}
    </h3>
    
    {/* CLICKABLE ID SECTION */}
    <div 
      onClick={() => handleCopy(String(room.id))}
      className="flex items-center gap-2 cursor-pointer group/id"
    >
      <p className="text-[10px] font-mono text-zinc-500 uppercase group-hover/id:text-blue-400 transition-colors">
        ID: {String(room.id)}
      </p>
      
      {/* Dynamic Icon based on copy state */}
      
      {copiedId === (room.id) ? (
        <CheckCircle2 size={10} className="text-green-500 animate-bounce" />
      ) : (
        <Copy size={10} className="text-zinc-600 opacity-0 group-hover/id:opacity-100 transition-all" />
      )}
      
      {/* Tooltip (Optional) */}
      {copiedId === String(room.id) && (
        <span className="text-[8px] text-green-500 font-bold uppercase tracking-tighter">Copied!</span>
      )}
    </div>
  </div>
</div>





             <div className="flex items-center gap-3">
              <button className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <p className="text-zinc-600 italic text-sm">No rooms found in your history.</p>
        </div>
      )}
    </div>
    
    {/* Bottom Fade Effect (Optional) */}
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
  </div>
  {/* SCROLL BOX END */}

  <style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #27272a; /* zinc-800 */
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #3f3f46; /* zinc-700 */
    }
  `}</style>
     </div>

            </motion.div>
          )   : 
          (
            <motion.div 
              key="join-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl"
            >
              <h1 className="text-3xl font-bold text-white mb-2 italic">Join Room</h1>
              <p className="text-zinc-500 mb-8">Enter a Room ID to participate in a chat.</p>

              <div className="flex gap-4 mb-12">
                <input 
                  type="text" 
                  placeholder="Paste Room ID here (e.g. room_123)..." 
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all font-mono"
                  value={roomId} onChange={(e)=>setRoomId((e.target.value))}
                />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
                onClick={()=>router.push(`/all-chats/${roomId}`)}
                >
                  Join
                </button>
              </div>

              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">
                <MessageSquare size={16} /> Recent Chats
              </h2>
              

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Reusable Room Card Component
function RoomCard({ room, onDelete }: { room: any; onDelete: () => void }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
          <Hash size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-200">{room.name}</h3>
          <p className="text-xs text-zinc-500 font-mono">{room.id} • {room.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">Open Chat</button>
        <button 
          onClick={onDelete}
          className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}