"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { BACKEND_URL } from "@/app/config";
import { Send, Shield } from "lucide-react";
import { useSocket } from "@/hook/useSocket";

type ChatMessage = {
  message: string;
  userId: string;
  createdAt?: string;
};

export default function ChatPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Previous Chats
  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/signup");
      try {
        const res = await axios.get(`${BACKEND_URL}/chats/${slug}`, {
          headers: { Authorization: token },
        });
        setChats(res.data.messages || []);
      } catch (err) { console.error(err); }
    };
    fetchChats();
  }, [slug]);

  // 2. Socket Logic
  useEffect(() => {
    if (!socket || loading) return;
    socket.send(JSON.stringify({ type: "join_room", roomId: slug }));

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setChats((prev) => [...prev, {
          message: data.message,
          userId: data.userId,
          createdAt: new Date().toISOString(),
        }]);
      }
    };
    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, loading, slug]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    socket?.send(JSON.stringify({ type: "chat", roomId: slug, message: currentMessage }));
    setCurrentMessage("");
  };

  return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center font-mono selection:bg-white selection:text-black">
      
      {/* MAIN CHAT CONTAINER */}
      <div className="w-full max-w-3xl h-full md:h-[70vh] flex flex-col p-6">
        
        {/* HEADER - CLEAN & BOLD */}
        <header className="mb-12 flex items-center justify-between border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white">
              ROOM // {slug}
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-30">
            <Shield size={12} />
            <span className="text-[9px] uppercase tracking-widest font-bold">Secure Relay</span>
          </div>
        </header>

        {/* MESSAGE FEED */}
        <main className="flex-1 overflow-y-auto space-y-10 scrollbar-hide pr-2">
          {chats.map((m, i) => (
            <div key={i} className="group transition-opacity duration-300">
              <div className="flex flex-col gap-2">
                {/* MESSAGE TEXT - REMOVED ITALIC */}
                <p className="text-zinc-200 text-sm md:text-base leading-relaxed tracking-normal font-medium break-words max-w-2xl">
                  {m.message}
                </p>
                
                {/* TIMESTAMP - ONLY VISIBLE ON HOVER */}
                <span className="text-[8px] text-zinc-800 group-hover:text-zinc-500 transition-colors uppercase font-bold tracking-tighter">
                  {(() => {
                    const date = m.createdAt ? new Date(m.createdAt) : new Date();
                    return isNaN(date.getTime()) 
                      ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                      : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  })()}
                </span>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </main>

        {/* GHOST INPUT - FLAT DESIGN */}
        <footer className="mt-8">
          <div className="flex items-center gap-4 bg-zinc-900/30 border border-zinc-900 px-4 py-3 rounded-xl focus-within:border-zinc-700 transition-all">
            <input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="SEND MESSAGE..."
              className="flex-1 bg-transparent outline-none text-white text-xs font-bold tracking-widest placeholder:text-zinc-800 uppercase"
            />
            <button
              onClick={sendMessage}
              className="p-1 text-zinc-600 hover:text-white transition-colors active:scale-90"
            >
              <Send size={18} strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-4 text-center">
             <span className="text-[8px] text-zinc-800 uppercase tracking-[0.3em] font-black">
               Chugli Protocol Active
             </span>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}