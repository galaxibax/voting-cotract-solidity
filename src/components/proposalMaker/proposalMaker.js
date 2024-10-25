import React from "react";
import ButtonTemplate from "../button/button";
import { useNavigate } from 'react-router-dom';

const ProposalMaker = ({
  avatarName,
  tokenName,
  tokenAmount,
  tokenNum,
  unlockTime,
  holders,
  tokenVolume,
  networkAvatar,
  networkName,
}) => {

  const navigate = useNavigate()
  const handleMove = () => {
    navigate('/proposalcreate')
  }

  return (

    <>
      <div className="flex justify-between items-center w-full bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] p-[20px]">
        <div className="flex gap-1 items-center justify-center">
          <img src={`/images/${avatarName}.png`} alt="token avatar" className="h-[41px] w-[41px] rounded-[50%]" />
          <p className="font-semibold text-[20px] text-white">{tokenName}</p>
        </div>
        <div>
          <p className="font-normal text-[16px] text-white">${tokenAmount}</p>
          <p className="font-normal text-[12px] text-[#9B9B9B]">{tokenNum} ETH</p>
        </div>
        <div className="text-[16px] text-white font-normal text-center">
          {unlockTime} Days
        </div>
        <div className="text-[16px] text-white font-normal text-center">
          {holders}
        </div>
        <div className="text-[16px] text-white font-normal text-center">
          ${tokenVolume}
        </div>
        <div className="flex gap-1 items-center justify-center">
          <img src={`/images/${networkAvatar}.png`} alt="network avatar" className="h-[20px] w-[20px] rounded-[50%]" />
          <p className="font-normal text-[16px] text-white">{networkName}</p>
        </div>
        <div>
          <ButtonTemplate
            onclick={handleMove}
            innerStyle="px-[10px] py-[10px] text-[12px] font-semibold"
            buttonText="Make a proposal"
          />
        </div>
      </div>
    </>
  )
}

export default ProposalMaker
