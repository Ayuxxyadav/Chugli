"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";


export default function GlassNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Change style on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const Navitems = [
        {name:"Home" , href:"/"},
        {name:"Dashboard", href:"/dashboard"},
        {name:"About Us" , href:"/aboutUs"}
    ]


    return (


        <nav className="fixed top-0 inset-x-0 w-full z-50 flex justify-center p-4">
            <div
                className={`w-full max-w-7xl flex items-center justify-between px-8 py-3 transition-all duration-300 rounded-2xl border border-white/10 
        ${isScrolled ? "bg-black/40 backdrop-blur-xl shadow-2xl" : "bg-white/5 backdrop-blur-md"}`}
            >

                {/* LEFT PART: Logo & Company Name */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm">
                        <Image
                            src="https://i.pinimg.com/736x/54/18/76/54187685754e214082ed3331679c3884.jpg"
                            alt="BeeChat Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold text-white group-hover:opacity-80 transition-opacity">
                        BeeChat
                    </span>
                </Link>


                {/* CENTER PART: Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                 {
                  Navitems.map((nav)=>(
                    <Link
                    key={nav.name}
                    href={nav.href}
                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"

                    >
                    {nav.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))

                 }
                    
                    
                    
                </div>

                {/* RIGHT PART: Buttons */}
                <div className="flex items-center gap-4">
                    <Link href="/signin">
                        <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                            Login
                        </button>
                    </Link>
                    
                    <Link href={"/signup"}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-lg shadow-white/5"
                     
                    >
                        Get Started
                    </motion.button>
                    </Link>
                </div>

            </div>
        </nav>
    );
}