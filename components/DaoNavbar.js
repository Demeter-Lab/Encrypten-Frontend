import React from "react";
import { SearchIcon } from "@/assets/ConstantIcons";


const DaoNavbar = () => {

  return (
    <nav className="py-2 md:py-2">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-300 py-2 pl-2">
        <a href="/" className="text-white text-2xl font-bold logo">
          Encrypten
        </a>
        <div className="hidden md:flex flex-1 md:ml-4 md:mr-4 ml-2 mr-2 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search DAOs, Proposals, Forum..."
            className="text-gray-700 border-none rounded-full pl-8 py-2 w-full"
            style={{ fontSize: '14px' }}
          />
        </div>
       
<w3m-button />

      </div>
    </nav>
  );
};

export default DaoNavbar;
