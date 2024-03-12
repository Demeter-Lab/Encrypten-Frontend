"use client";
import { useState } from "react";
import DaoNavbar from "@/components/DaoNavbar";
import NewProposal from "@/components/NewProposal";
import CustomComponent from "@/components/CustomComponent";
import componentData from "@/components/componentData";
import { SearchIcon } from "@/assets/ConstantIcons";

const DAO = () => {
  const [filter, setFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");


  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredProposals = componentData.filter(
    (proposal) =>
      (filter === "all" || proposal.status === filter) &&
      (!searchValue ||
        proposal.proposalTitle
          .toLowerCase()
          .includes(searchValue.toLowerCase()))
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

        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => (
            <CustomComponent key={proposal.id} data={proposal} />
          ))
        ) : (
          <p className="text-gray-200 mt-8 ml-2">No proposals found</p>
        )}
      </div>
    </>
  );
};

export default DAO;
