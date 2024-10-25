import React, { useState } from 'react';

const ProgressBar = ({
  min = 0,
  max = 100,
  step = 10,
  OnRangeChange
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e) => {
    setValue(e.target.value);
    OnRangeChange(e.target.value)
  };

  const ticks = [];
  for (let i = min; i <= max; i += step) {
    ticks.push(i);
  }

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-2/3 appearance-none mt-1 py-1 px-2 border-[1px] border-[#FFFFFF33] rounded-[10px] text-white bg-[#0000004D]"
      />
    </>
  );
};

export default ProgressBar;
