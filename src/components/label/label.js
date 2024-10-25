import React from "react";

const LabelTemplate = ({
  labelStyle,
  labelText
}) => {
  return (
    <>
      <div>
        <p className={`${labelStyle} text-[12px] font-normal text-[#9B9B9B]`}>
          {labelText}
        </p>
      </div>
    </>
  )
}

export default LabelTemplate