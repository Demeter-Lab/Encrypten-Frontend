"use client";
import React, { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import EncryptenAbi from "../abi/EncryptenAbi";
import DaoNavbar from "@/components/DaoNavbar";
import NewProposal from "@/components/NewProposal";
import CustomComponent from "@/components/CustomComponent";
import { SearchIcon } from "@/assets/ConstantIcons";

const DAO = () => {
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [proposals, setProposals] = useState([]);
  const { signer } = useWallet();

  useEffect(() => {
    const fetchProposals = async () => {
      if (!signer) return; // Return early if signer is not available

      const encryptenContractAddress =
        "0x52AcA4EcD92E7DCb1d37dc1e012C26Bbb2121114";
      const encryptenContract = new ethers.Contract(
        encryptenContractAddress,
        EncryptenAbi,
        signer
      );

      try {
        const fetchedProposals = await encryptenContract.getAllProposals();

        const formattedProposals = fetchedProposals.map((proposal) => {
          const startTime = new Date(proposal[5].toNumber() * 1000);
          const endTime = new Date(proposal[6].toNumber() * 1000);
          const now = new Date();

          let status = "active";

          if (now > endTime) {
            status = "inactive";
          }

          return {
            id: proposal[0].toNumber(),
            title: proposal[1],
            content: proposal[2],
            upVote: proposal[3].toNumber(),
            downVote: proposal[4].toNumber(),
            startTime: startTime.toLocaleString(),
            endTime: endTime.toLocaleString(),
            creator: `${proposal[8].slice(0, 4)}...${proposal[8].slice(-3)}`,
            status: status,
          };
        });

        setProposals(formattedProposals);
      } catch (error) {
        console.log("Error Fetching Proposals: ", error);
      }
    };

    fetchProposals();
  }, [signer]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredProposals = proposals.filter(
    (proposal) =>
      (filter === "all" || proposal.status === filter) &&
      (!searchValue ||
        proposal.title.toLowerCase().includes(searchValue.toLowerCase()))
  );

  return (
    <>
      <DaoNavbar />
      <NewProposal />
      <div className="bg-transparent border border-gray-400 max-w-3xl mx-auto p-4 mb-4 mt-8 rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <div className="md:flex flex-1 md:ml-4 md:mr-4 ml-2 mr-2 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search DAOs, Proposal Title..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="text-gray-700 border-none rounded-full pl-8 py-2 w-full"
              style={{ fontSize: "14px" }}
            />
          </div>

          <div className="relative">
            <select
              className="bg-transparent border border-gray-400 text-gray-200 rounded-md py-2 px-2"
              onChange={(e) => handleFilterChange(e.target.value)}
              value={filter}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {signer ? (
          filteredProposals.length > 0 ? (
            <CustomComponent proposals={filteredProposals} />
          ) : (
            <p className="text-gray-200 mt-8 ml-2">No proposals found</p>
          )
        ) : (
          <p className="text-gray-200 mt-8 ml-2 text-center">
            Connect Wallet To See Proposals
          </p>
        )}
      </div>
    </>
  );
};

export default DAO;
