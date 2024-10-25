import React from "react";
import ButtonTemplate from "../button/button";
import ShowTemplate from "../showTemplate/showTemplate";
import { Link } from "react-router-dom";

const ProposalStateShow = ({
  proposalTitle,
  proposalAddress,
  proposalDescription,
  unlockAmount,
  startDate,
  endDate
}) => {

  

  return (
    <>
      {/* <Link to="/proposaldetail" > */}

      <div className="relative flex w-full h-[200px] border-[1px] border-[#FFFFFF33] rounded-[10px] bg-zinc-900">
        <div className="p-[20px] text-white w-[70%]">
          <p className="text-[16px] font-semibold">
            {proposalTitle}
          </p>
          <p className="text-[12px] font-semibold mt-2" >
            {proposalAddress}
          </p>
          <div className="mt-2">
            <p className="text-[12px] font-normal ">
              {proposalDescription}
            </p>
            <div >
              <ButtonTemplate
                buttonStyle="absolute bottom-5"
                innerStyle="px-[60px] py-[5px] text-[10px] font-normal"
                buttonText="Vote"
              />
            </div>
          </div>

        </div>
        <div className="w-[30%] h-full border-l-[1px] border-l-[#FFFFFF33] rounded-[10px] bg-custom-gradient">
          <div className="p-[20px]">
            <p className="text-[16px] font-semibold text-white">
              Information
            </p>
            <div className="flex flex-col mt-[15px]">
              <div className="flex justify-between items-center">
                <p className="text-[12px] text-[#9B9B9B] font-normal">
                  Unlocking amount
                </p>
                <div>
                  <ShowTemplate
                    innerStyle="text-end w-[120px] px-[10px] py-[5px] text-[12px] font-normal"
                    showText={unlockAmount}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-[10px] ">
                <p className="text-[12px] text-[#9B9B9B] font-normal">
                  Start date
                </p>
                <p className="text-[12px] text-white font-normal">
                  {startDate?.slice(0, 10) + " " + startDate?.slice(11, 19)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-[10px] ">
                <p className="text-[12px] text-[#9B9B9B] font-normal">
                  End date
                </p>
                <p className="text-[12px] text-white font-normal">
                  {endDate?.slice(0, 10) + " " + endDate?.slice(11, 19)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  )
}

export default ProposalStateShow


