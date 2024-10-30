import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProposalShow from "../../components/proposalShow/proposalShow";
import Information from "../../components/Information/information";
import ButtonTemplate from "../../components/button/button";
import RangeInput from "../../components/rangeInput/rangeInput";
import axios from "axios";

const ProposalDetail = () => {

  const { contract } = useSelector((state) => state.contract)
  const { account } = useSelector((state) => state.account)
  const { id } = useParams()

  const [oneProData, setOneProData] = useState([])
  const getOneProposal = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getproposal/onedata/${id}`)
    setOneProData(res?.data)
  }

  const [lockDuration, setLockDuration] = useState('')
  const [maxLockAmount, setMaxLockAmount] = useState('')
  const [LockedAmount, setLockedAmount] = useState('')
  let proposalId = oneProData[0]?._id
  const [res, setRes] = useState('')

  const getContractData = async () => {
    const resLockDuration = await contract.methods.lockDuration().call()
    const resMaxLockAmount = await contract.methods.maxLockAmount().call()
    const resLockedAmount = await contract.methods.totalLockedTokens().call()
    setLockDuration(resLockDuration)
    setMaxLockAmount(resMaxLockAmount)
    setLockedAmount(resLockedAmount)
  }

  useEffect(() => {
    if (contract) {
      getContractData()
      getOneProposal()
    }
  }, [res])

  const startVote = async () => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/getproposal/getnumber`, { proposalId })

    if (contract) {
      const contractId = res?.data[0]?.proposalId / 1
      const itemId = res?.data[0]?._id
      await contract?.methods?.castVote(contractId, true).send({ from: account })
      const resData = await axios.post(`${process.env.REACT_APP_API_URL}/updateproposal/update`, { itemId })
      setRes(resData)
    }
  }

  return (
    <>
      <div className="max-w-screen-xl m-auto px-[140px]">
        <div className="mt-[40px]">
          <p className="text-[20px] text-white text-center font-normal">
            Proposal List
          </p>
        </div>
        <div className="mt-[10px]">
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
        <div className="mt-[20px] w-[102%] h-[420px] overflow-scroll">
          <div className="flex justify-between gap-[10px] pr-[13px]">
            <div className="w-[68%]">
              <div className={`p-[20px] border-[1px] border-[#FFFFFF33] rounded-[10px] bg-custom-gradient`}>
                <div className="text-white">
                  <p className="text-[16px] font-semibold">
                    {oneProData[0]?.title}
                  </p>
                  <p className="text-[12px] font-semibold mt-2" >
                    {oneProData[0]?.optional}

                  </p>
                  <div className="mt-[20px]">
                    <p className="text-[12px] font-normal">
                      {oneProData[0]?.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[10px] mt-[40px]">
                  <RangeInput
                    state="yes"
                    progress={`${oneProData[0]?.yesAmount ? `${50 + oneProData[0]?.yesAmount}` : '50'}`}
                  />
                  <RangeInput
                    state="no"
                    progress={`${oneProData[0]?.yesAmount ? `${50 - oneProData[0]?.yesAmount}` : '50'}`}
                  />
                </div>
                <div className="flex mt-[20px] items-end">
                  <div className="w-1/2">
                    <span className="text-[10px] text-[#9B9B9B] font-bold">
                      Your voting power :
                    </span>
                    <span className="text-[10px] text-[#9B9B9B] font-semibold">
                      6,500 $TOKEN
                    </span>
                  </div>
                  <ButtonTemplate
                    onclick={startVote}
                    buttonStyle="ml-[-100px] "
                    innerStyle="px-[75px] py-[10px] text-[16px] font-semibold"
                    buttonText="Vote"
                  />
                </div>
              </div>

            </div>
            <div className="w-[31%]">
              <Information
                unlockAmount={oneProData[0]?.unlockAmount}
                startDate={oneProData[0]?.startSeconds}
                endDate={oneProData[0]?.endSeconds}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProposalDetail
