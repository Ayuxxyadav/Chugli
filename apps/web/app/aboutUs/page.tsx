"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Globe } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Encrypted", value: "100%" },
    { label: "Trust", value: "1000%" },
    { label: "Privacy Rating", value: "99.9%" },
    { label: "Latency", value: "<10ms" },
  ];
  const values = [
    {
      title: "Privacy First",
      desc: "We believe privacy is a human right. BeeChat doesn't track your identity or sell your data.",
      icon: <ShieldCheck className="text-blue-500" />,
    },
    {
      title: "Real-Time Speed",
      desc: "Built on cutting-edge WebSockets for instant messaging without any lag.",
      icon: <Zap className="text-yellow-500" />,
    },
    {
      title: "Community Driven",
      desc: "Designed for teams, friends, and communities who value secure spaces.",
      icon: <Users className="text-purple-500" />,
    },
    {
      title: "Global Reach",
      desc: "Connect with anyone, anywhere in the world, in a secure private room.",
      icon: <Globe className="text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-5 text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter "
          >
            Redefining <span className="text-blue-500">Privacy</span> <br /> in Digital Chats.
          </motion.h1>
          <p className="mt-6 text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            BeeChat was born out of a simple need: A place to talk freely without the fear of being watched. We are building the future of private communication.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold italic">Our Core Values</h2>
            <p className="text-zinc-400">
              At BeeChat, we don't just write code; we build trust. Our engineering team focuses on three pillars: Security, Simplicity, and Speed.
            </p>
            <div className="w-full h-64 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center italic text-zinc-700 font-black text-4xl select-none">BEECHAT_HQ</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors flex gap-4">
                <div className="mt-1">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{v.title}</h3>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-15 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 p-12 text-center shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 italic">Ready to experience privacy?</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
                onClick={() => window.location.href = "/signup"}
                className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-100 transition-all"
            >
              Start Chatting Now
            </button>
            <button 
                onClick={() => window.location.href = "/"}
                className="bg-black/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-black/30 transition-all"
            >
              Return To Home 
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}