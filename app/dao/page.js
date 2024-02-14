"use client";
import { useState } from "react";
import DaoNavbar from "@/components/DaoNavbar";
import NewProposal from "@/components/NewProposal";
import CustomComponent from "@/components/CustomComponent";
import componentData from "@/components/componentData";

const DAO = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredProposals = componentData.filter(
    (proposal) => filter === "all" || proposal.status === filter
  );

  return (
    <>
      <DaoNavbar />
      <NewProposal />
      <div className="bg-transparent border border-gray-400 max-w-3xl mx-auto p-4 mb-4 mt-8 rounded-lg">
        <div className="mb-4 flex justify-end">
          <div className="relative inline-flex">
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
        </div>
        {filteredProposals.map((proposal) => (
          <CustomComponent key={proposal.id} data={proposal} />
        ))}
      </div>
    </>
  );
};

export default DAO;
