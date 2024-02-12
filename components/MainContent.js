import React from "react";

const Home = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "80vh" }}
    >
      <MainContent />
    </div>
  );
};

const MainContent = () => {
  return (
    <>
      <div className="p-4 rounded-lg text-center">
        <h2 className="text-[24px] sm:text-[44px] text-gray-200 font-semibold leading-[1] mt-4">
          Encrypten Is A DAO-Based Ecosystem For
          <br className="hidden sm:inline" /> Tenprotocol!
        </h2>
        <p className="text-[12px] sm:text-[12px] text-gray-400 mt-4">
          Redefining Decentralized Governance for Web3
          <br className="hidden sm:inline" /> Unlock the power of decentralized
          decision-making with Encrypten – your gateway to transparent, secure,
          and community-driven governance in the Web3 era
        </p>

        <button className="text-[#203475] hover:text-gray-300 bg-gray-300 hover:bg-black px-4 py-1 mt-6">
          Launch App
        </button>
      </div>
    </>
  );
};

export default Home;
