import React from "react";

const ProposalShow = ({
  avatarName,
  tokenName,
  tokenAmount,
  unlockTime,
  holders,
  tokenVolume,
  networkAvatar,
  networkName
}) => {
  return (
    <>
      <div className="flex text-center justify-between items-center w-full bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] py-[20px] pl-[20px] pr-[40px]">
        <div className="flex gap-1 items-center justify-center">
          <img src={`/images/${avatarName}.png`} alt="token avatar" className="h-[41px] w-[41px] rounded-[50%]" />
          <p className="font-semibold text-[20px] text-white">{tokenName}</p>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#9B9B9B]">Tax Locked Amount</p>
          <p className="font-normal text-[16px] text-white">${tokenAmount}</p>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#9B9B9B]">Unlocked Time</p>
          <p className="font-normal text-[16px] text-white">{unlockTime} Days</p>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#9B9B9B]">Holders</p>
          <p className="font-normal text-[16px] text-white">{holders}</p>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#9B9B9B]">Token Volume</p>
          <p className="font-normal text-[16px] text-white">${tokenVolume}</p>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#9B9B9B]">Network</p>
          <div className="flex gap-1 items-center justify-center">
            <img src={`/images/${networkAvatar}.png`} alt="network avatar" className="h-[20px] w-[20px] rounded-[50%]" />
            <p className="font-normal text-[16px] text-white">{networkName}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProposalShow
