import React from "react";
import ButtonTemplate from "./button";
import ShowTemplate from "../showTemplate/showTemplate";

const ProposalDetailTemplate = ({
  proposalDetailStyle,
  proposalTitle,
  proposalAddress,
  proposalDescription,
  yesPercentage,
  noPercentage
}) => {

  return (
    <>
      <div className={` ${proposalDetailStyle} border-[1px] border-[#FFFFFF33] rounded-[10px] bg-custom-gradient`}>
        <div className="p-[20px] text-white">
          <p className="text-[16px] font-semibold">
            {proposalTitle}
          </p>
          <p className="text-[12px] font-semibold mt-2" >
            {proposalAddress}
          </p>
          <div className="mt-[20px]">
            <p className="text-[12px] font-normal">
              {proposalDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProposalDetailTemplate


