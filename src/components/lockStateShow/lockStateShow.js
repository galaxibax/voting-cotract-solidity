import React from "react";

const LockStateShow = ({
  nowLockState,
  tokenName,
  lockedAmount,
  unlockedTime
}) => {

  return (
    <>
      <div className="border-[1px] bg-zinc-900 border-[#FFFFFF33] rounded-[10px] h-auto w-full md:w-full lg:w-[28%]">
        <p className="p-[8px] text-white text-center text-[16px] font-normal">
          {nowLockState}
        </p>
        <div className="px-[20px] py-[10px] border-t-[1px] border-t-[#FFFFFF33] rounded-[10px] bg-custom-gradient h-auto">
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/ethereum_img.png" className="rounded-[50%] w-[41px] h-[41px]" />
              <p>
                {tokenName}
              </p>
            </div>
            <div className="mt-1">
              <div className="flex justify-between items-center">
                <p className="font-normal text-[#9B9B9B] text-[16px]">
                  Locked Amount
                </p>
                <p className="font-normal text-white text-[16px]">
                  {lockedAmount}
                </p>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="font-normal text-[#9B9B9B] text-[16px]">
                  Unlocked Time
                </p>
                <p className="font-normal text-white text-[16px]">
                  {unlockedTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LockStateShow


