import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const CustomSelect = ({ options }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="absolute mt-[-20px] flex items-center justify-between w-full px-4 py-2 text-left bg-zinc-900 border-[1px] border-[#FFFFFF33] 
        rounded-[10px] z-20 focus:bg-zinc-800 focus-visible:bg-zinc-900"
      >
        <div className="flex items-center">
          <span className='text-white text-[14px] font-semibold'>{selectedOption.label}</span>
        </div>
        <FiChevronDown className="text-white" />
      </button>

      {isOpen && (
        <ul className="absolute pt-[20px] w-full bg-zinc-900 border-[1px] border-[#FFFFFF33] rounded-[10px] z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="flex items-center px-3 py-2 cursor-pointer text-white text-[14px] font-semibold"
            >
              <img
                src={option.avatar}
                alt="avatar"
                className="w-[20px] h-[20px] rounded-full mr-2"
              />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
