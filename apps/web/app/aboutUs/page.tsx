"use client";
import React from "react";
import { ShieldCheck, Zap, Users, Globe, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Encrypted", value: "100%" },
    { label: "Trust", value: "100%" },
    { label: "Privacy Rating", value: "99.9%" },
    { label: "Latency", value: "<10ms" },
  ];

  const values = [
    {
      title: "Privacy First",
      desc: "We believe privacy is a human right. Chugli doesn't track your identity or sell your data.",
      icon: <ShieldCheck className="text-blue-500" size={24} />,
    },
    {
      title: "Real-Time Speed",
      desc: "Built on optimized WebSockets for instant messaging without any lag or trace.",
      icon: <Zap className="text-yellow-500" size={24} />,
    },
    {
      title: "Shadow Mode",
      desc: "No names, no profiles. Every user is an equal, anonymous participant.",
      icon: <Users className="text-purple-500" size={24} />,
    },
    {
      title: "Zero Retention",
      desc: "Messages vanish when the session ends. We store nothing in persistent memory.",
      icon: <Globe className="text-green-500" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-black py-5 text-zinc-400 font-sans selection:bg-white selection:text-black">
      
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase ">
            DECODING <span className="text-blue-500">PRIVACY</span>.
          </h1>
          <p className="mt-8 text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Chugli was born from a simple philosophy: Digital conversations should be as private as a whisper in a dark room. No logs. No trackers. Just the void.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-zinc-900 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-500 transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-zinc-700 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold group-hover:text-zinc-500 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 border border-zinc-800 rounded-full text-[10px] uppercase tracking-widest font-bold text-zinc-600">
              The Protocol
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight italic">Our Core Values</h2>
            <p className="text-zinc-500 leading-relaxed text-lg">
              At Chugli, we don't just write code; we build digital immunity. Our engineering focuses on three pillars: <span className="text-zinc-300">Absolute Anonymity</span>, <span className="text-zinc-300">Zero Persistence</span>, and <span className="text-zinc-300">Sub-10ms Relay</span>.
            </p>
            <div className="w-full h-80 bg-zinc-900/30 rounded-3xl border border-zinc-900 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center italic text-zinc-800 font-black text-6xl tracking-tighter select-none opacity-20 group-hover:opacity-40 transition-opacity">
                  CHUGLI_VOID
                </div>
            </div>
          </div>

          <div className="space-y-4">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-2xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-300 flex gap-6 group">
                <div className="mt-1 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight">{v.title}</h3>
                  <p className="text-zinc-500 text-sm mt-2 leading-relaxed font-medium">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-blue-500 p-12 text-center shadow-2xl shadow-blue-500/10 group overflow-hidden relative">
          {/* Subtle decoration inside CTA */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8 tracking-tighter uppercase italic relative z-10">
            Ready to vanish?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">

            
            <button 
                onClick={() => window.location.href = "/"}
                className="bg-zinc-400 text-black border border-black/10 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black/5 transition-all"
            >
              Back to Home 
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer Info */}
      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.5em] text-zinc-800 font-bold">
        Chugli Protocol // Anonymous Relay // {new Date().getFullYear()}
      </footer>
    </div>
  );
}