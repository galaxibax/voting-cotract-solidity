import { react } from 'react'

const ButtonTemplate = ({
  buttonText,
  buttonStyle,
  innerStyle,
  onclick
}) => {

  return (
    <>
      <div
        onClick={onclick}
        className={` ${buttonStyle} md:w-fit w-full p-[1px] rounded-[10px] bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 hover:cursor-pointer
      `}>
        <div className={`${innerStyle} bg-zinc-900 px-[30px] py-[10px] rounded-[10px] text-white text-center hover:bg-hover-gradient`}>
          <p>{buttonText}</p>
        </div>
      </div>
    </>
  )
}

export default ButtonTemplate
