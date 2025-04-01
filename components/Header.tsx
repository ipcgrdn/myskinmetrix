"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, CheckSquare, Mail, Palette } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    {
      href: "/personal-color",
      label: "퍼스널 컬러",
      icon: <Palette className="w-4 h-4 mr-1" />,
    },
    {
      href: "/survey",
      label: "피부 분석",
      icon: <CheckSquare className="w-4 h-4 mr-1" />,
    },
    {
      href: "/contact",
      label: "문의하기",
      icon: <Mail className="w-4 h-4 mr-1" />,
    },
  ];

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
              className="w-8 h-8 hidden"
              priority
            />
            <h1 className="text-sm md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              My Skin Metrix
            </h1>
          </Link>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            
            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-600 hover:text-cyan-500 transition-colors flex items-center"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 모바일 메뉴 토글 버튼 */}
            <button
              className="md:hidden text-slate-700 hover:text-cyan-500 transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-600 hover:text-cyan-500 transition-colors flex items-center py-2 gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
