

const RangeInput = ({
  progress,
  className,
  state
}) => {
  return (
    <div className={`${className} relative w-full h-[30px] border-[1px] border-[#FFFFFF33] rounded-[10px] bg-zinc-800`}>
      <div
        className="absolute  px-2 pt-[1px] top-1/2 transform -translate-y-1/2 border-r-[1px] border-r-[#FFFFFF33] rounded-[10px] bg-voiting-gradient"
        style={{
          left: 0,
          width: `${progress}%`,
          height: "30px",
        }}
      >
        <div className="w-max">

          {
            state == "yes" ?
              <span className={`${ progress ? "text-black" : "text-white"} font-semibold text-[12px]`}>
                Yes
              </span>
              :
              <span className={`${progress ? "text-black" : "text-white"} font-semibold text-[12px]`}>
                No
              </span>
          }
          <span className={`${progress ? "text-black" : "text-white"} font-semibold text-[12px] ml-[20px] `}>
            {progress * 1000} TOKEN
          </span>
        </div>
      </div>

      <div className="absolute right-0 m-auto text-white font-semibold text-[12px] px-2 pt-[5px]">
        {progress}%
      </div>
    </div >
  );
}

export default RangeInput;
