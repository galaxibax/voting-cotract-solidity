import React, { useState, useEffect } from "react";
import ProposalShow from "../../components/proposalShow/proposalShow";
import ShowTemplate from "../../components/showTemplate/showTemplate";
import DatePicker1 from "../../components/datePicker/datePicker1";
import DatePicker2 from "../../components/datePicker/datePicker2";
import ButtonTemplate from "../../components/button/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LabelTemplate from "../../components/label/label";
import axios from "axios";

const CreateProposal = () => {

  const navigate = useNavigate()

  const [openVal1, setOpenVal1] = useState(false)
  const [openVal2, setOpenVal2] = useState(false)
  const openDatePicker1 = () => setOpenVal1(!openVal1)
  const openDatePicker2 = () => setOpenVal2(!openVal2)
  const [timeValue1, setTimeValue1] = useState('')
  const [dateValue1, setDateValue1] = useState('')
  const [timeValue2, setTimeValue2] = useState('')
  const [dateValue2, setDateValue2] = useState('')

  const handleTime1 = (time) => {
    setTimeValue1(time)
  }
  const handleDate1 = (date) => {
    setDateValue1(date)
  }
  const handleShow1 = (prop) => {
    if (prop) {
      openDatePicker1()
    }
  }
  const handleTime2 = (time) => {
    setTimeValue2(time)
  }
  const handleDate2 = (date) => {
    setDateValue2(date)
  }
  const handleShow2 = (prop) => {
    if (prop) {
      openDatePicker2()
    }
  }

  const { contract } = useSelector((state) => state.contract)
  const { account } = useSelector((state) => state.account)
  const [lockAddress, setLockAddress] = useState('')
  const [lockDuration, setLockDuration] = useState('')
  const [maxLockAmount, setMaxLockAmount] = useState('')
  const [LockedAmount, setLockedAmount] = useState('')

  const getContractData = async () => {
    const resLockAddress = await contract.methods.lockAddress().call()
    const resLockDuration = await contract.methods.lockDuration().call()
    const resMaxLockAmount = await contract.methods.maxLockAmount().call()
    const resLockedAmount = await contract.methods.totalLockedTokens().call()
    setLockAddress(resLockAddress)
    setLockDuration(resLockDuration)
    setMaxLockAmount(resMaxLockAmount)
    setLockedAmount(resLockedAmount)
  }

  useEffect(() => {
    if (contract) {
      getContractData()
    }
  }, [])

  const [title, setTitle] = useState('')
  const [unlockAmount, setUnlockAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [optional, setOptional] = useState('')
  const [error, setError] = useState('')

  const makeProposal = async () => {
    const startTime = dateValue1 + " " + timeValue1
    const startSeconds = new Date(startTime).getTime()
    const endTime = dateValue2 + " " + timeValue2
    const endSeconds = new Date(endTime).getTime()

    if (typeof endSeconds !== 'number' || isNaN(endSeconds)) setError("End Time is required")
    if (typeof startSeconds !== 'number' || isNaN(startSeconds)) setError("Start Time is required")
    if (optional.trim() === "") setError("Recipient Address (Optional) is required")
    // if (typeof unlockAmount !== 'number' || isNaN(unlockAmount)) setError("unlockAmount is required")
    if (description.trim() === "") setError("Description is required")
    if (title.trim() === "") setError("Title is required")

    if (
      (typeof endSeconds === 'number' && !isNaN(endSeconds)) ||
      (typeof startSeconds === 'number' && !isNaN(startSeconds)) ||
      optional.trim() !== "" ||
      (typeof unlockAmount === 'number' && !isNaN(unlockAmount)) ||
      description.trim() !== "" ||
      title.trim() !== ""
    ) {

      if (contract) {
        await contract?.methods?.createProposal(
          title, description, optional, unlockAmount, startSeconds, endSeconds
        ).send({ from: account })

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/proposal`,
          {
            title: title,
            description: description,
            optional: optional,
            unlockAmount: unlockAmount,
            startSeconds: startSeconds,
            endSeconds: endSeconds
          }
        )
        navigate('/proposallist')
      }
    }
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 3000);
    }
  }, [error])

  return (
    <>
      <div className="max-w-screen-xl m-auto px-[5%] md:px-[80px] lg:px-[140px] min-w-[375px]">
        <div className="mt-[40px]">
          <p className="text-[20px] text-white text-center font-normal">
            Make a Proposal
          </p>
        </div>

        <div className="mt-2.5">
          <ProposalShow
            avatarName="ethereum_img"
            tokenName="ETH"
            tokenAmount={`${LockedAmount.toString() ? LockedAmount.toString() : '0'}`}
            unlockTime={`${lockDuration.toString() ? lockDuration.toString() : '0'}`}
            holders="150"
            tokenVolume={(maxLockAmount.toString() * 2469.39).toFixed(3)}
            networkAvatar="ethereum_img"
            networkName="Ethereum"
          />
        </div>

        <div className="mx-auto mt-5 p-5 w-full sm:w-[68%] m-auto bg-custom-gradient border-[1px] border-[#FFFFFF33] rounded-[10px]">
          <div className="h-[15px]">
            <LabelTemplate
              labelStyle="text-center text-red-500 font-semibold "
              labelText={error}
            />
          </div>

          <div className="flex sm:flex-row flex-col justify-between items-center gap-2 sm:gap-[100px]">
            <div className="w-full sm:w-[320px]">
              <p className="text-[12px] font-bold text-[#9B9B9B]">Title</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-[30px] mt-[2px] appearance-none border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D] text-white px-2" />
            </div>
            <div className="w-full sm:w-[220px]">
              <p className="text-[12px] font-bold text-[#9B9B9B]">Start Date</p>
              <div onClick={openDatePicker1} className="relative z-40 flex px-[5px] items-center justify-end  text-white hover:cursor-pointer h-[30px] text-[12px] font-bold mt-[2px] border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D]">
                {
                  dateValue1 && timeValue1 &&
                  < div >
                    {dateValue1}, {timeValue1}
                  </div>
                }
              </div>
              {
                openVal1 &&
                <DatePicker1
                  getTime1={handleTime1}
                  getDate1={handleDate1}
                  setShow1={handleShow1}
                  datePickerStyle=""
                />
              }
            </div>
          </div>

          <div className="flex sm:flex-row flex-col justify-between items-center gap-2 sm:gap-[100px] mt-[10px]">
            <div className="w-full sm:w-[320px]">
              <p className="text-[12px] font-bold text-[#9B9B9B]">Unlocking amount (in $)</p>
              <input
                onChange={(e) => setUnlockAmount(e.target.value)}
                className="w-full h-[30px] mt-[2px] appearance-none border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D] text-white px-2" />
            </div>
            
            <div className="w-full sm:w-[220px]">
              <p className="text-[12px] font-bold text-[#9B9B9B]">End Date</p>
              <div onClick={openDatePicker2} className="relative z-20 flex px-[5px] items-center justify-end  text-white hover:cursor-pointer h-[30px] text-[12px] font-bold mt-[2px] border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D]">
                {
                  dateValue2 && timeValue2 &&
                  < div >
                    {dateValue2}, {timeValue2}
                  </div>
                }
              </div>
              {
                openVal2 &&
                <DatePicker2
                  getTime2={handleTime2}
                  getDate2={handleDate2}
                  setShow2={handleShow2}
                  datePickerStyle=""
                />
              }
            </div>
          </div>

          <div className="w-full mt-[10px]">
            <p className="text-[12px] font-bold text-[#9B9B9B]">Description (in $)</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none mt-[2px] h-[100px] p-1  appearance-none border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D] text-white px-2" />
          </div>

          <div className="w-full sm:w-1/2">
            <p className="text-[12px] font-bold text-[#9B9B9B]">Discussion (optional)</p>
            <input
              onChange={(e) => setOptional(e.target.value)}
              className="w-full mt-[2px] h-[30px] appearance-none border-[1px] border-[#FFFFFF33] rounded-[10px] bg-[#0000004D] text-white px-2" />
          </div>

          <div className="mt-[30px]">
            <ButtonTemplate
              onclick={makeProposal}
              buttonText="Create Proposal"
              buttonStyle="mx-auto"
            />
          </div>
        </div>
      </div >
    </>

  )
}

export default CreateProposal