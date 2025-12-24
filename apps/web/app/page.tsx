"use client"
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield } from "lucide-react";

export default function Home() {

  const [roomName, setRoomName] = useState("");
  return (
 <main className="bg-black text-white">
      
{/*HERO SECTION */}
<section className="relative min-h-[87vh] flex items-center justify-center px-6 overflow-hidden bg-black">
      
      {/* Background Glow - Deep & Dynamic */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full mt-[-150px]" />
      </div>

      <div className="relative max-w-5xl   text-center">
        {/* Floating Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center mt-10 gap-2 px-4 py-1.5 mb-8 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500"
        >
          <Shield size={12} className="text-blue-500" />
          End-to-End Encrypted Spaces
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl  font-black leading-[0.9] tracking-tighter  text-white"
        >
          START YOUR PRIVATE <br /> 
          <span className="text-blue-500 text-glow italic text-6xl md:text-8xl">CONVERSATION</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-zinc-500 max-w-2xl mx-auto text-lg md:text-xl  font-medium"
        >
          No tracking. No ads. Just pure real-time connection. 
          Enter a name and jump into your secure room instantly.
        </motion.p>

        {/* --- NEW CREATE ROOM SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto"
        >
          <div className="relative w-full group">
            <input 
              type="text" 
              placeholder="Give your room a name..." 
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-5 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all italic font-medium text-white placeholder:text-zinc-600"
            />
            <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </div>

          <button 
            className="w-full md:w-auto whitespace-nowrap bg-white text-black px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
          >
            <Plus size={16} strokeWidth={3} />
            Create Room
          </button>
        </motion.div>

        {/* Secondary Info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-[13px] uppercase tracking-widest text-zinc-600 font-bold"
        >
          Press <span className="text-zinc-400">Enter</span> to create instantly
        </motion.p>
      </div>
    </section>


{/*FEATURES SECTION */}
<section className="relative  px-6 overflow-hidden">
  
  {/* Background Glow */}
  <div className="absolute inset-0 flex justify-center">
    <div className="w-[400px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full" />
  </div>

  <div className="relative max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center">
      Everything you need for{" "}
      <span className="text-zinc-400">private chats</span>
    </h2>

    <p className="mt-3 text-zinc-400 text-center max-w-2xl mx-auto">
      Powerful features designed for secure and seamless conversations.
    </p>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          title: "Private Rooms",
          desc: "Create invite-only rooms that only selected users can access.",
          icon: "🔒",
        },
        {
          title: "Secure Authentication",
          desc: "Enterprise-grade security to protect your account and chats.",
          icon: "🛡️",
        },
        {
          title: "Real-Time Messaging",
          desc: "Instant messaging with live typing indicators and zero lag.",
          icon: "💬",
        },
        {
          title: "Multi-User Support",
          desc: "Unlimited participants for teams and communities.",
          icon: "👥",
        },
      ].map((item) => (
        <div
          key={item.title}
          className="
            group relative rounded-2xl border border-zinc-700 
            bg-gradient-to-b from-zinc-900/40 to-black
            p-6 transition-all duration-300
            hover:-translate-y-1 hover:border-blue-400/60
            hover:shadow-[0_0_40px_rgba(96,165,250,0.15)]
          "
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 mb-4 group-hover:bg-blue-400/20 transition">
            {item.icon}
          </div>

          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-zinc-400 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/** How IT WORKS */}
<section className="relative py-20 px-6 bg-black overflow-hidden">
  
  {/* Accent Line Glow */}
  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

  <div className="relative max-w-6xl mx-auto">
    
    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold">
        How <span className="text-zinc-400">BeeChat</span> works
      </h2>
      <p className="mt-3 text-zinc-400">
        A simple flow designed for speed, privacy, and ease of use.
      </p>
    </div>

    {/* Timeline */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

      {/* Step */}
      <div className="relative">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-400 text-black font-bold flex items-center justify-center">
          1
        </div>
        <h3 className="mt-6 text-lg font-semibold">Create a Room</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Instantly create a private chat room with a unique name.
        </p>
      </div>

      {/* Step */}
      <div className="relative">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-400 text-black font-bold flex items-center justify-center">
          2
        </div>
        <h3 className="mt-6 text-lg font-semibold">Invite People</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Share the room name with friends or teammates securely.
        </p>
      </div>

      {/* Step */}
      <div className="relative">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-400 text-black font-bold flex items-center justify-center">
          3
        </div>
        <h3 className="mt-6 text-lg font-semibold">Start Chatting</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Chat in real-time with full privacy and encryption.
        </p>
      </div>

    </div>
  </div>
</section>

{/** FREQUENTLY ASKED Q */}
<section className="relative py-20 px-6 overflow-hidden bg-black text-white">
  {/* Background Glow Effect */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
  </div>

  <div className="relative max-w-3xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        Frequently Asked <span className="text-blue-400">Questions</span>
      </h2>
      <p className="mt-4 text-zinc-400">
        Everything you need to know about BeeChat's privacy and real-time security.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-4">
      {[
        {
          q: "Is BeeChat really private?",
          a: "Yes. BeeChat is built on a 'Privacy-First' architecture. We don't track your personal data or sell your information to advertisers. Your rooms are yours alone.",
        },
        {
          q: "How does BeeChat maintain real-time speed without compromising security?",
          a: "We use optimized WebSockets combined with enterprise-grade encryption. This ensures your messages are delivered instantly (zero lag) while remaining protected during transit.",
        },
        {
          q: "Can anyone join my Private Rooms?",
          a: "No. Private Rooms are strictly invite-only. Only users with the unique room ID and your permission can see or participate in the conversation.",
        },
        {
          q: "How is my data protected on your servers?",
          a: "We use industry-standard hashing and secure database protocols. Authentication tokens are stored securely in your browser, ensuring that only you can access your account.",
        },
        {
          q: "Are my messages stored forever?",
          a: "BeeChat focuses on real-time communication. You have the control to manage your conversations, and we are continuously working on features like auto-delete for enhanced privacy.",
        },
      ].map((faq, index) => (
        <details
          key={index}
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700"
        >
          <summary className="flex cursor-pointer items-center justify-between p-6 list-none">
            <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">
              {faq.q}
            </h3>
            <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
              <svg
                className="h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>


{/* Footer section */}
<footer className="border-t border-zinc-800 bg-black py-10 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-zinc-400">
    
    {/* LEFT: BRAND */}
    <div>
      <h2 className="text-lg font-semibold text-white">BeeChat</h2>
      <p className="mt-2 max-w-xs">
        Secure conversations. Private rooms built for modern communication.
      </p>
      <p className="mt-4 text-xs">
        © {new Date().getFullYear()} BeeChat
      </p>
    </div>

    {/* MIDDLE: LINKS */}
    <div>
      <h3 className="text-white font-medium mb-3">BeeChat Links</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </li>

      </ul>
    </div>

    {/* RIGHT: LEGAL */}
    <div>
      <h3 className="text-white font-medium mb-3">Legal</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/terms" className="hover:text-white transition">
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
        </li>

      </ul>
    </div>

  </div>
</footer>

  </main>
  );
}
