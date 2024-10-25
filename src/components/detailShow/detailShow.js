import React from "react";

const DetailShow = ({
  avatarName,
  tokenName,
  tokenAmount,
  tokenNum,
  unlockTime,
  holders,
  tokenVolume,
  networkAvatar,
  networkName
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] py-[20px] pl-[20px] backdrop-blur-[30px]">
        <div className="flex gap-[9px] items-center justify-start w-[20%]">
          <img src={`/images/${avatarName}.png`} alt="token avatar" className="w-10 aspect-square rounded-full " />
          <p className="font-semibold text-[20px] text-white hidden sm:block">{tokenName}</p>
        </div>
        <div className="w-[15%] flex flex-col justify-center items-center">
          <p className="font-normal text-base text-white">$ {tokenAmount}</p>
          <p className="font-normal text-[12px] text-[#9B9B9B]">{tokenNum} ETH</p>
        </div>
        <div className="text-base text-white font-normal text-center w-[15%]">
          {unlockTime} Days
        </div>
        <div className="text-base text-white font-normal text-center w-[15%]">
          {holders}
        </div>
        <div className="text-base text-white font-normal text-center w-[15%]">
          $ {tokenVolume}
        </div>
        <div className="flex gap-1 items-center justify-center w-[20%]">
          <img src={`/images/${networkAvatar}.png`} alt="network avatar" className="h-[20px] w-[20px] rounded-[50%]" />
          <p className="font-normal text-base text-white">{networkName}</p>
        </div>
      </div>
    </>
  )
}

export default DetailShow
