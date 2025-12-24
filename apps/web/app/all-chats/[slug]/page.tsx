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
    <div className="h-screen bg-black flex flex-col items-center justify-center font-mono selection:bg-zinc-800">
      
      {/* SECRET CONTAINER */}
      <div className="w-full max-w-3xl h-full md:h-[85vh] flex flex-col p-6">
        
        {/* MINIMAL HEADER */}
        <header className="mb-10 flex items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-zinc-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Encrypted Session: {slug}
            </span>
          </div>
          <span className="text-[10px] text-zinc-700">VOID_PROTOCOL_V1</span>
        </header>

        {/* MESSAGE FEED - NO NAMES, JUST TEXT & DATE */}
        <main className="flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-4">
          {chats.map((m, i) => (
            <div key={i} className="group animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1">
                {/* MESSAGE TEXT */}
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed tracking-tight break-words">
                  {m.message}
                </p>
                
                {/* DATE / TIME (Visible on Hover or very subtle) */}
<span className="text-[9px] text-zinc-800 group-hover:text-zinc-600 transition-colors uppercase font-bold">
  {(() => {
    const date = m.createdAt ? new Date(m.createdAt) : new Date();
    // Agar date phir bhi invalid ho (NaN), toh current time dikha do
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

        {/* GHOST INPUT */}
        <footer className="mt-6 border-t border-zinc-900 pt-6">
          <div className="flex items-center gap-4 bg-zinc-950/50 p-2 rounded-lg group">
            <input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write into the void..."
              className="flex-1 bg-transparent px-2 py-2 outline-none text-zinc-400 text-sm placeholder:text-zinc-800 italic"
            />
            <button
              onClick={sendMessage}
              className="p-2 text-zinc-700 hover:text-white transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}