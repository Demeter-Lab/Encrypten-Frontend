"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("overview");
  const pathname = usePathname();
  console.log("Current Path", pathname);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 md:py-2">
      <div className="container mx-auto flex justify-between items-center border-b border-gray-300 py-2 pl-2">
        <div>
          <a href="/" className="text-white text-2xl font-bold logo">
            Encrypten
          </a>
        </div>
        <div className="hidden md:flex space-x-6">
          <ul className="flex space-x-6">
            <li className="group relative">
              <Link
                href={"/"}
                className={`${
                  pathname === "/" ? "text-[#191970]" : "text-white"
                }`}
                aria-label="Go to Home"
              >
                Overview
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/roadmap"}
                className={`${
                  pathname === "/roadmap" ? "text-[#191970]" : "text-white"
                }`}
              >
                Roadmap
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/documentation"}
                className={`${
                  pathname === "/documentation"
                    ? "text-[#191970]"
                    : "text-white"
                }`}
              >
                Docs
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
          </ul>

          <button className="text-[#203475] hover:text-gray-300 bg-gray-200 hover:bg-black rounded-md px-4 py-1">
            Launch App
          </button>
        </div>
        <div className="md:hidden pr-3">
          <button onClick={toggleNavbar} className="text-[#203475]">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden py-4 border-b border-gray-300 pl-4">
          <ul className="flex flex-col space-y-3">
            <li>
              <a href="#" className="text-white">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Roadmap
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Docs
              </a>
            </li>
          </ul>
          <button className="bg-gray-200 border border-[#203475] text-[#203475] px-4 py-1 rounded-md mt-3">
            Launch App
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
