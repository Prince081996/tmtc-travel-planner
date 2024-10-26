"use client"
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo and Dashboard */}
          <div className="flex">
            <Link href="/dashboard" className={`${pathname === "/dashboard" ? "text-[#f7d6d0]" : "text-white"} text-2xl p-2 font-bold hover:text-[#f7d6d0]`} passHref>
          Dashboard
            </Link>
            <Link href="/search" className={`${pathname === "/search" ? "text-[#f7d6d0]": "text-white" } text-2xl p-2 font-bold text-white hover:text-[#f7d6d0]` }  passHref>
          Search
            </Link>
          </div>

          {/* Right Side: Logout Button and Mobile Menu Icon */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:inline-block bg-white hover:bg-[#f7d6d0] px-4 py-2 rounded-lg text-black">
              Logout
            </button>
            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="focus:outline-none text-gray-300 hover:text-white"
              >
                {/* Hamburger Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <button className="w-full bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
