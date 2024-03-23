import React, { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { ethers } from "ethers";
import EncryptenAbi from "@/app/abi/EncryptenAbi";
import { UpvoteIcon, DownvoteIcon } from "@/assets/ConstantIcons";
import Notification from "./Notification";

const CustomComponent = () => {
  const [proposals, setProposals] = useState([]);
  const { signer } = useWallet();

  const [loadingStates, setLoadingStates] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      if (!signer) return;

      const encryptenContractAddress =
        "0x52AcA4EcD92E7DCb1d37dc1e012C26Bbb2121114";
      const encryptenContract = new ethers.Contract(
        encryptenContractAddress,
        EncryptenAbi,
        signer
      );

      try {
        // const totalProposal = await encryptenContract.getTotalNoOfProposals();
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

  const castVote = async (proposalId, isUpvote) => {
    if (!signer) return;

    setLoadingStates(prevLoadingStates => ({
      ...prevLoadingStates,
      [proposalId]: true
    }));


    const encryptenContractAddress =
      "0x52AcA4EcD92E7DCb1d37dc1e012C26Bbb2121114";
    const encryptenContract = new ethers.Contract(
      encryptenContractAddress,
      EncryptenAbi,
      signer
    );

    try {
      const tx = await encryptenContract.vote(proposalId, isUpvote);
      await tx.wait();
      setNotification({
        message: "Vote submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.log("Error Message: ", error);
      if (error.message.includes("execution reverted: Already Voted!")) {
        setNotification({
          message: "You have already voted on this proposal.",
          type: "error",
        });
      } else {
        setNotification({
          message: "Error submitting vote. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoadingStates(prevLoadingStates => ({
        ...prevLoadingStates,
        [proposalId]: false
      }));

    }
  };

  if (!signer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className={`bg-white rounded-lg shadow-lg ${
            proposal.status === "active" ? "border-green-500" : "border-red-500"
          } max-w-3xl mx-auto p-4 mb-4`}
        >
          <div className="border-b p-4">
            <h2 className="text-xl text-[#191970] font-semibold">
              {proposal.title}
            </h2>
            <p className="text-gray-600 text-sm">{proposal.creator}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{proposal.content}</p>
          </div>

          <div className="flex justify-end">
            <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-lg text-sm">
              End Date: {proposal.endTime}
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${
                proposal.status === "active"
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              }`}
            >
              {proposal.status}
            </span>
            <div className="flex items-center">
            <span className="mr-2 text-gray-800">votes:</span>
            <button
              className="text-gray-700 text-sm py-2 px-4 mr-2 flex items-center"
              onClick={() => castVote(proposal.id, true)}
              disabled={loadingStates[proposal.id]} 
            >
              <UpvoteIcon className="mr-1" />
              {loadingStates[proposal.id] ? <LoadingAnimation /> : proposal.upVote}
            </button>
            <button
              className="text-gray-700 text-sm py-2 px-4 flex items-center"
              onClick={() => castVote(proposal.id, false)}
              disabled={loadingStates[proposal.id]} 
            >
              <DownvoteIcon className="mr-1" />
              {loadingStates[proposal.id] ? <LoadingAnimation /> : proposal.downVote}
            </button>
          </div>
          </div>
        </div>
      ))}
    </>
  );
};

const LoadingAnimation = () => (
  <span className="loader">
    <span className="loader__dot">•</span>
    <span className="loader__dot">•</span>
    <span className="loader__dot">•</span>
  </span>
);

export default CustomComponent;
