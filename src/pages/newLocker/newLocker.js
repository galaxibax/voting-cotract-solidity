import React, { useEffect, useState } from "react";
import LabelTemplate from "../../components/label/label";
import ButtonTemplate from "../../components/button/button";
import { useNavigate } from 'react-router-dom';
import ProgressBar from "../../components/progressBar/progressBar";
import NotificationDialog from "../../components/notification/notification";
import { useSelector } from "react-redux";
import axios from 'axios'

const NewLocker = () => {

  const navigate = useNavigate()
  const { contract } = useSelector((state) => state.contract)
  const { account } = useSelector((state) => state.account)
  const [showNotification, setShowNotification] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [error, setError] = useState('')
  const [num, setNum] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [rangeValue, setRangeValue] = useState("")

  const handleAddress = (e) => {
    const value = e.target.value;
    setTokenAddress(value)
  }

  const handleNum = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setNum(value);
      setErrorMsg("");
    } else {
      setErrorMsg("Please enter a valid number");
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }, [error])

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(!showNotification)
      }, 3000);
    }
  }, [showNotification])

  const handleNewLock = async () => {

    if (tokenAddress.trim() === "") setError("Address is required")
    if (num.trim() === "") setError("Amount is required")
    if (rangeValue.trim() === "") setError("Duration is required")

    if (tokenAddress.trim() !== "" && num.trim() !== "" && rangeValue.trim() !== "") {
      if (contract) {
        await contract?.methods?.lockStart(tokenAddress, rangeValue, num).send({ from: account })
        await setShowNotification(!showNotification)

        const lockedAmount = await contract?.methods?.totalLockedTokens().call()
        const unLockTime = await contract?.methods?.lockDuration().call()
        const maxAmount = await contract?.methods?.maxLockAmount().call()
        const holders = 0

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/newlocked`,
          {
            amount: lockedAmount.toString(),
            unLockTime: unLockTime.toString(),
            maxAmount: maxAmount.toString(),
            holders: holders,
          })

        navigate("/")
      }
    }
  }

  return (
    <>
      {
        showNotification &&
        <NotificationDialog props="Lock Address Created!" />
      }

      <div className="max-w-screen-xl m-auto px-[5%] md:px-[240px] mt-[70px] min-w-[375px]">
        <div className="flex gap-[20px] justify-center items-center">
          <div >
            <img src="/images/new_locker_left.png" className="hidden md:block" />
          </div>
          <div className="flex flex-col w-full sm:w-[60%] md:w-auto">

            <p className="text-white text-[20px] font-normal text-center">
              Tax Locker Creator
            </p>

            <div className="bg-custom-gradient w-full md:w-[360px] rounded-[10px] border-[1px] border-[#FFFFFF33] mt-[10px] px-[20px] pt-[10px] pb-[20px]">

              <div className="h-[15px]">
                <LabelTemplate
                  labelStyle="text-center text-red-500 font-semibold "
                  labelText={error}
                />
              </div>

              <LabelTemplate
                labelText="Token address"
              />

              <input
                value={tokenAddress}
                onChange={(e) => handleAddress(e)}
                type="text"
                className="w-full mt-1 py-2 px-2 border-[1px] border-[#FFFFFF33] rounded-[10px] text-white text-[12px] bg-[#0000004D]"
              />

              <div className="flex justify-between items-baseline mt-2 pr-[30px]">
                <LabelTemplate
                  labelStyle=""
                  labelText="Lock duration"
                />
                <LabelTemplate
                  labelStyle="text-[8px] font-bold text-[#9B9B9B]"
                  labelText="In months"
                />
              </div>

              <div className="flex gap-2">
                <ProgressBar OnRangeChange={setRangeValue} min={0} max={100} step={20} />
                <div className="w-1/3 text-center mt-1 py-1 px-2 border-[1px] border-[#FFFFFF33] rounded-[10px] text-white bg-[#0000004D]"
                >
                  Custom
                </div>
              </div>

              <div className="flex mt-1 gap-1 ">
                <LabelTemplate
                  labelText="Period:"
                />
                <LabelTemplate
                  labelStyle="text-white"
                  labelText={`${rangeValue ? rangeValue : 0} Days`}
                />
              </div>

              <LabelTemplate
                labelStyle={` mt-2 ${!errorMsg ? " " : "text-orange-500 text-center font-semibold"} `}
                labelText={` ${!errorMsg ? "ETHamount " : "Invalid Type"} `}
              />

              <div className={`relative w-full flex items-center h-[40px] rounded-[10px] border-[1px] mt-1 border-[#FFFFFF33] `}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <img src="/images/ethereum_img.png" className="w-[10px] mt-[2px] h-[10px] rounded-[50%]" />
                </div>
                <input
                  value={num}
                  onChange={(e) => handleNum(e)}
                  type="text"
                  className="block w-full rounded-[10px] h-full px-7 bg-[#0000004D] text-[12px] font-normal text-[#9B9B9B]"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ">
                  <LabelTemplate
                    labelText={`($${num * 97821.39} )`}
                  />
                </div>
              </div>

              <ButtonTemplate
                onclick={() => handleNewLock()}
                buttonStyle="mt-[20px] mx-auto"
                innerStyle="px-[50px]"
                buttonText='Lock'
              />
            </div>

            <div className="flex mt-[20px] mx-auto w-[80px] h-[30px] bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] px-8 justify-center items-center hover:cursor-pointer" >
              <p onClick={() => navigate(-1)} className="font-semibold text-[12px] text-white text-center">
                Back
              </p>
            </div>
          </div>
          <div>
            <img src="/images/new_locker_right.png" className="hidden md:block" />
          </div>
        </div>
      </div >
    </>
  )
}

export default NewLocker
