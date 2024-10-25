import React from "react";
import ShowTemplate from "../showTemplate/showTemplate";

const Information = ({
  unlockAmount,
  startDate,
  endDate
}) => {
  return (
    <>
      <div className="border-[1px] border-[#FFFFFF33] rounded-[10px] bg-custom-gradient">
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
                  showText={unlockAmount * 2469.34}
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
    </>
  )
}

export default Information