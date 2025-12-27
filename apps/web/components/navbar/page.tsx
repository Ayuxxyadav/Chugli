"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, LogOutIcon, UserRound } from "lucide-react";

export default function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  /* 🔹 Scroll effect */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔹 Check token on mount */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  /* 🔹 Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    router.push("/"); // ✅ home par hi rahe
  };

  const Navitems1 = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About Us", href: "/aboutUs" },
  ];

  const Navitems2 = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/aboutUs" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 w-full z-50 flex justify-center p-4">
      <div
        className={`w-full max-w-7xl flex items-center justify-between px-8 py-3 rounded-2xl border border-white/10 transition-all
        ${isScrolled ? "bg-black/40 backdrop-blur-xl shadow-2xl" : "bg-white/5 backdrop-blur-md"}`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white">
            <Image
              src="https://i.pinimg.com/736x/54/18/76/54187685754e214082ed3331679c3884.jpg"
              alt="BeeChat Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold text-white">Chugli</span>
        </Link>

        {/* Center */}
        <div className="flex items-center gap-8">
          {(loggedIn ? Navitems1 : Navitems2).map((nav) => (
            <Link
              key={nav.name}
              href={nav.href}
              className="text-sm font-medium text-zinc-300 hover:text-white relative group"
            >
              {nav.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
          </div>

          <div className="flex items-end gap-6 ">

          {/* AUTH BUTTONS */}
          {loggedIn ? (
            <div className="flex items-end gap-5">
            <button
              className="text-sm flex gap-2 font-medium text-blue-400 hover:text-blue-500 transition-colors"

            >
            <UserRound/>
            </button>
            <button
              onClick={handleLogout}
              className="text-sm flex gap-2 font-medium text-red-400 hover:text-red-500 transition-colors"
            >
                Logout <LogOut/>
              
            </button>

            </div>
          ) : (
            <>
              <Link href="/signin">
                <button className="text-sm py-3 font-medium text-zinc-300 hover:text-white">
                  Login
                </button>
              </Link>

              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white text-sm font-bold px-5 my-1.5 py-2 rounded-md"
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          )}
          </div>
      </div>
    </nav>
  );
}
