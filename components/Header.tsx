"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="My Skin Metrix 로고"
              width={32}
              height={32}
              className="w-8 h-8 hidden md:block"
              priority
            />
            <h1 className="text-sm md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              My Skin Metrix
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
