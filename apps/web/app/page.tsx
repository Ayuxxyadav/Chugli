"use client"
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [roomName, setRoomName] = useState("");
  const router = useRouter()
  return (
    <main className="bg-black text-white">

      {/*HERO SECTION */}
<section className="relative min-h-[115vh] bg-black flex items-center justify-center px-6 overflow-hidden">

  {/* Blue ambient layers */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 blur-[220px] rounded-full" />
    <div className="absolute bottom-[-250px] right-[-200px] w-[700px] h-[700px] bg-blue-500/10 blur-[180px] rounded-full" />
  </div>

  <div className="relative max-w-6xl text-center">



    {/* Main Heading */}
    <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">

       <span className="text-blue-500 text-3xl font-semibold tracking-widest">Welcome to</span>
       <br /> <span className= "text-zinc-500 tracking-[0.2em] ">CHUGLI.</span>
    </h1>

    {/* Description */}
    <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl font-light text-white-400 leading-relaxed">
      <span className="text-zinc-400 font-semibold tracking-wider">Chugli</span> is an anonymous chat
      platform where your identity stays hidden.<br/>
      Join rooms using secure random codes <br />— no names, no profiles, no trace.
    </p>

    {/* Feature Cards */}
    <div className="mt-25 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

      <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 
        hover:border-blue-500/50 transition">
  
        <h3 className="text-white font-bold tracking-wider mb-2">
          Anonymous by Default
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          No usernames. No avatars. Only messages exist.
        </p>
      </div>

      <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 
        hover:border-blue-500/50 transition">
        
        <h3 className="text-white font-bold tracking-wider mb-2 ">
          Secure Room Codes
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Each room is protected with a long, unguessable code.
        </p>
      </div>

      <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-7 
        hover:border-blue-500/50 transition">
        <h3 className="text-white font-bold  mb-2">
          Real-Time Conversations
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Instant messages with no delay and no identity leakage.
        </p>
      </div>

    </div>

    {/* Bottom Philosophy */}
    <p className="mt-30 text-shadow-xs uppercase tracking-[0.4em] text-blue-500/70">
      Privacy is the feature
    </p>

  </div>
</section>





      {/*FEATURES SECTION */}


      {/**HoW Chugli Works */}
      <section className="relative py-24 px-6 bg-black overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent hidden md:block" />

        <div className="relative max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              How <span className="text-zinc-500">Chugli</span> works
            </h2>
            <p className="mt-4 text-zinc-500 font-medium">
              A simple flow designed for speed, privacy, and ease of use.
            </p>
          </div>
          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center relative">

            <div className="group relative">
              <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-blue-500 text-black font-black text-xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110">
                1
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Create a Room</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
                  Instantly create a private chat room with a unique name.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-blue-500 text-black font-black text-xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110">
                2
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Invite People</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
                  Share the room name with friends or teammates securely.
                </p>
              </div>
            </div>
            <div className="group relative">
              <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-blue-500 text-black font-black text-xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110">
                3
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Start Chatting</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-[250px] mx-auto">
                  Chat in real-time with full privacy and encryption.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

{/* FREQUENTLY ASKED QUESTIONS - Native CSS Version */}
<section className="relative py-24 px-6 overflow-hidden bg-black text-white">
  {/* Background Glow Effect */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
    <div className="w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
  </div>

  <div className="relative max-w-3xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase ">
        Frequently Asked <span className="text-blue-400">Questions</span>
      </h2>
      <p className="mt-4 text-zinc-500 font-medium">
        Everything you need to know about Chugli's privacy and real-time security.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-4">
      {[
        {
          q: "Is Chugli really private?",
          a: "Yes. Chugli is built on a 'Privacy-First' architecture. We don't track your personal data or sell your information to advertisers. Your rooms are yours alone.",
        },
        {
          q: "How does Chugli maintain real-time speed without compromising security?",
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
          a: "Chugli focuses on real-time communication. You have the control to manage your conversations, and we are continuously working on features like auto-delete for enhanced privacy.",
        },
      ].map((faq, index) => (
        <details
          key={index}
          className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700"
        >
          <summary className="flex cursor-pointer items-center justify-between p-6 list-none outline-none">
            <h3 className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors duration-200">
              {faq.q}
            </h3>
            <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
              <svg
                className="h-5 w-5 text-zinc-500 group-hover:text-blue-400 transition-colors"
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
          <div className="px-6 pb-6 text-zinc-500 text-sm leading-relaxed border-t border-zinc-800/50 pt-4 mt-2 transition-all">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </div>
</section>
   


      {/* Footer section */}
     
<footer className="border-t border-zinc-900 bg-black py-16 px-6 relative overflow-hidden">
  {/* Subtle bottom glow */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-zinc-500">
    
    {/* LEFT: BRAND */}
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        
        <h2 className="text-xl font-black text-white tracking-tighter uppercase">
          Chugli
        </h2>
      </div>
      <p className="leading-relaxed max-w-xs font-medium">
        Encrypted conversations. Private rooms built for the next generation of secure communication.
      </p>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700">
        © {new Date().getFullYear()} Chugli 
      </p>
    </div>

    {/* MIDDLE: LINKS */}
    <div className="md:pl-10">
      <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 ">
        Navigation
      </h3>
      <ul className="space-y-3">
        <li>
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
            <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all" />
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group">
            <span className="w-0 h-px bg-blue-400 group-hover:w-3 transition-all" />
            Dashboard
          </Link>
        </li>
      </ul>
    </div>

    {/* RIGHT: LEGAL */}
    <div className="md:pl-10">
      <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 ">
        Security
      </h3>
      <ul className="space-y-3">
        <li>
          <Link href="/terms" className="hover:text-white transition-colors duration-200">
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:text-white transition-colors duration-200">
            Privacy Policy
          </Link>
        </li>
        <li className="text-[10px] text-zinc-800 font-mono mt-4">
          STATUS: ALL_SYSTEMS_OPERATIONAL
        </li>
      </ul>
    </div>

  </div>
</footer>

    </main>
  );
}
