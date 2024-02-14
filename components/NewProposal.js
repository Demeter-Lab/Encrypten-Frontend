import React from 'react';
import { PlusIcon } from '@/assets/ConstantIcons';

const NewProposal = () => {
  return (
    <div className="container mx-auto flex items-center justify-end mt-8 p-2">
      <button className="border border-gray-200 text-gray-200 px-4 py-2 rounded-full flex items-center">
        <PlusIcon className="h-5 w-5 mr-2" /> New Proposal
      </button>
    </div>
  );
};

export default NewProposal;
