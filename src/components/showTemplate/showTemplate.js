import { react } from 'react'

const ShowTemplate = ({
  showText,
  outerStyle,
  innerStyle
}) => {

  return (
    <>
      <div className={` ${outerStyle} w-fit p-[1px] rounded-[10px] bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 hover:cursor-pointer`}>
        <div className={`${innerStyle} bg-zinc-800 rounded-[10px] text-white text-right `}>
          <p>$ {showText}</p>
        </div>
      </div>
    </>
  )
}

export default ShowTemplate
