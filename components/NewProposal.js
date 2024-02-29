import React, { useState } from "react";
import { PlusIcon } from "@/assets/ConstantIcons";

const NewProposal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProposal = () => {
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Duration:", duration);

    setTitle("");
    setContent("");
    setDuration("");
    closeModal();
  };

  return (
    <div className="container mx-auto flex items-center justify-end mt-8 p-2">
      <button
        className="border border-gray-200 text-gray-200 px-4 py-2 rounded-full flex items-center"
        onClick={openModal}
      >
        <PlusIcon className="h-5 w-5 mr-2" /> New Proposal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-gray-200 p-8 rounded-lg w-[500px]">
          <h2 className="text-xl text-[#191970] font-light">Create Proposal</h2>
            <div className="mb-4 mt-8">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreateProposal}
                className="px-4 py-2 bg-[#191970] text-gray-200 rounded hover:bg-blue-600"
              >
                Create
              </button>
              <button
                onClick={closeModal}
                className="ml-2 px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProposal;
