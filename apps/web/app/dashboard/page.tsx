"use client";
import React, { useEffect, useState } from "react";
import { Copy, CheckCircle2, PlusCircle, LogIn, History, Trash2, Hash, MessageSquare } from "lucide-react";
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
  const router = useRouter();
  const [createRoom, setcreateRoom] = useState("");
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fetchAllRoomData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/signup");
    try {
      const res = await axios.get(`${BACKEND_URL}/allrooms`, {
        headers: { Authorization: token },
      });
      setAllRooms(res.data.allRooms);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllRoomData();
  }, []);

  async function handleCreateRoom() {
    const token = localStorage.getItem("token");
    if (!createRoom.trim()) return;
    try {
      await axios.post(`${BACKEND_URL}/room`, { name: createRoom }, {
        headers: { Authorization: `${token}` }
      });
      setcreateRoom("");
      fetchAllRoomData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-screen py-12 bg-black text-zinc-400 font-sans selection:bg-white selection:text-black">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-900 bg-[#050505] p-6 flex flex-col gap-8">
        <div className="py-10">
          <span className="text-xs tracking-[0.4em] font-black text-white uppercase ">Chugli</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-xs font-bold uppercase tracking-widest ${activeTab === "create" ? "bg-white text-black" : "hover:bg-zinc-900 text-zinc-500"}`}
          >
            <PlusCircle size={16} />
            Create
          </button>
          
          <button 
            onClick={() => setActiveTab("join")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-xs font-bold uppercase tracking-widest ${activeTab === "join" ? "bg-white text-black" : "hover:bg-zinc-900 text-zinc-500"}`}
          >
            <LogIn size={16} />
            Join
          </button>
        </nav>

        <div className="mt-auto p-4 rounded-xl border border-zinc-900 bg-zinc-950">
          <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-black mb-2">Protocol</p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">Do not share Room id Publicly.</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-12 overflow-y-auto">
        
        {activeTab === "create" ? (
          <div className="max-w-4xl transition-all duration-500">
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Create Room</h1>
            <p className="text-sm text-zinc-600 mb-10 font-medium">Initialize a new secure Room.</p>

            <div className="flex flex-col md:flex-row gap-3 mb-16 max-w-2xl">
              <input 
                type="text" 
                placeholder="ENTER ROOM NAME " 
                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-zinc-500 transition-colors font-mono text-sm text-white uppercase tracking-widest"
                value={createRoom} 
                onChange={(e) => setcreateRoom(e.target.value)}
              />
              <button 
                className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 active:scale-95 transition-all"
                onClick={handleCreateRoom}
              >
                Initialize
              </button>
            </div>

            <div className="space-y-6">
              <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
                <History size={14} /> Registry History
              </h2>

              <div className="rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto p-2 space-y-1 scrollbar-hide">
                  {allRooms && allRooms.length > 0 ? (
                    allRooms.map((room) => (
                      <div key={room.id} className="group flex items-center justify-between p-4 hover:bg-zinc-900/50 rounded-xl transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-blue-500 transition-colors">
                            <Hash size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">{room.slug}</h3>
                            <div onClick={() => handleCopy(String(room.id))} className="flex items-center gap-2 cursor-pointer mt-1">
                              <span className="text-[9px] font-mono text-zinc-700 group-hover:text-zinc-500 uppercase transition-colors tracking-tighter">
                                SIGNATURE: {String(room.id)}
                              </span>
                              {copiedId === room.id ? (
                                <span className="text-[8px] text-green-500 font-black tracking-widest animate-pulse">COPIED</span>
                              ) : (
                                <Copy size={10} className="text-zinc-800 opacity-0 group-hover:opacity-100" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
         
                            <button className="p-2 text-zinc-800 hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-xs uppercase tracking-widest text-zinc-800 font-bold">
                      No active stations found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl">
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Join Room</h1>
            <p className="text-sm text-zinc-600 mb-10 font-medium">Sync with an existing encrypted tunnel.</p>

            <div className="flex flex-col md:flex-row gap-3 mb-16 max-w-2xl">
              <input 
                type="text" 
                placeholder="PASTE_SIGNATURE..." 
                className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-zinc-500 transition-colors font-mono text-sm text-white uppercase tracking-widest"
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button 
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 active:scale-95 transition-all shadow-xl shadow-blue-900/10"
                onClick={() => router.push(`/all-chats/${roomId}`)}
              >
                Establish Link
              </button>
            </div>

            <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
              <MessageSquare size={14} /> Active Intercepts
            </h2>
          </div>
        )}
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}