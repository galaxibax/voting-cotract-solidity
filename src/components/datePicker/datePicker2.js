import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./datePicker.css"

const DatePicker2 = (
  {
    getTime2,
    getDate2,
    setShow2,
    datePickerStyle,
  }
) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00 AM");

  const generateTimes = () => {
    const times = [];
    let time = new Date(2000, 0, 1, 0, 0);
    for (let i = 0; i < 48; i++) {
      times.push(format(time, "h:mm a"));
      time = new Date(time.getTime() + 30 * 60000);
    }
    return times;
  };

  const times = generateTimes();
  const nextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const prevMonth = () => setSelectedDate(subMonths(selectedDate, 1));

  const daysInMonth = () => {
    const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const days = [];
    for (let i = start.getDate(); i <= end.getDate(); i++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }
    return days;
  };

  const complete = () => {
    getTime2(selectedTime)
    getDate2(format(selectedDate, "MMMM d, yyyy"))
    setShow2(true)
  }

  return (
    <div className={` ${datePickerStyle} absolute z-10 p-[15px] mt-[-30px] w-[29%] overflow-hidden bg-zinc-900 border-[1px] border-[#FFFFFF33] text-white rounded-[10px]`}>
      <div className="flex pt-[20px] px-[20px] justify-end">
        <div onClick={complete} className='border-[1px] border-[#FFFFFF33] rounded-[10px] px-6 py-1 hover:cursor-pointer hover:bg-hover-gradient' >
          OK
        </div>
      </div>
      <div className='flex justify-between gap-[10px] mt-[10px]'>
        <div className=''>
          <div className="flex items-center justify-between px-[10%] mb-4">
            <div className="flex items-center">
              <button onClick={prevMonth} className="px-2 py-1 ">
                <FaChevronLeft className='text-[12px]' />
              </button>
            </div>
            <div className="text-[12px] font-bold text-white">
              {format(selectedDate, "MMMM yyyy")}
            </div>
            <div className="flex items-center">
              <button onClick={nextMonth} className="px-2 py-1 ">
                <FaChevronRight className='text-[12px]' />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-700">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="font-bold text-[#AAAAAA] text-[14px]">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {daysInMonth().map((day, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`rounded-[10px] aspect-square  p-[1px] ${day.getDate() === selectedDate.getDate() ? 'bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600' : ''}`
                }
              >
                <div className={`flex justify-center items-center rounded-[10px] w-[28px] aspect-square text-white text-center bg-[#131313] `}>
                  <p>
                    {format(day, "d")}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

        <div className='border-[1px] border-r-[#9B9B9B]'></div>

        <div className=' h-[320px] overflow-y-scroll custom-scrollbar '>
          <div className="flex flex-col gap-[4px] px-[5px] ">
            {times.map((time, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTime(time)}
                className={`p-[1px] text-white rounded-[10px] ${time === selectedTime ? 'bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600' : 'hover:bg-gray-100'
                  }`}
              >
                <div className={` rounded-[10px] text-[12px] px-[20px] py-[5px] text-white text-center bg-[#131313] `}>
                  {time}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DatePicker2;
