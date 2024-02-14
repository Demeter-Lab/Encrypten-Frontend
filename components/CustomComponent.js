import React from "react";
import { UpvoteIcon } from "@/assets/ConstantIcons";
import { DownvoteIcon } from "@/assets/ConstantIcons";

const CustomComponent = ({ data }) => {
  return (
    <>
    <div
      className={`bg-white rounded-lg shadow-lg ${
        data.status === "active" ? "border-green-500" : "border-red-500"
      } max-w-3xl mx-auto p-4 mb-4`}
    >
      <div className="border-b p-4">
        <h2 className="text-xl text-[#191970] font-semibold">{data.proposalTitle}</h2>
        <p className="text-gray-600 text-sm">{data.proposerName}</p>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{data.proposalDetails}</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <span
          className={`inline-block px-2 py-1 text-sm rounded ${
            data.status === "active"
              ? "text-green-500 bg-green-100"
              : "text-red-500 bg-red-100"
          }`}
        >
          {data.status}
        </span>
        <div className="flex items-center">
          <span className="mr-2 text-gray-800">votes:</span>
          <button className="text-gray-700 text-sm py-2 px-4 mr-2 flex items-center">
            <UpvoteIcon className="mr-1" />
            {data.upvotes}
          </button>
          <button className="text-gray-700 text-sm py-2 px-4 flex items-center">
            <DownvoteIcon className="mr-1" />
            {data.downvotes}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomComponent;
