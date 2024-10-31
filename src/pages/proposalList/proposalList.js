import React from "react";
import ProposalShow from "../../components/proposalShow/proposalShow";
import ProposalStateShow from "../../components/proposalStateShow/proposalStateShow";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Proposal = () => {

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

  const [allProposal, setAllProposal] = useState([])

  const getProposalData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/getproposal/alldata`)
    setAllProposal(res?.data)
  }

  useEffect(() => {
    if (contract) {
      getContractData()
      getProposalData()
    }
  }, [])

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

        <div className="mt-[20px] overflow-y-scroll w-[102%]">
          <div className="flex flex-col gap-[10px]  h-[420px] pr-[13px]">
            {
              allProposal?.map((item, key) => (
                <Link index={key} to={`/proposaldetail/${item?._id}`} >
                  <ProposalStateShow
                    proposalTitle={`${item.title ? item.title : 'Title'}`}
                    proposalAddress={item.optional}
                    proposalDescription={`${item.description ? item.description : 'Description'}`}
                    unlockAmount={item?.unlockAmount * 2946.34}
                    startDate={item.startSeconds}
                    endDate={item.endSeconds}
                  />
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Proposal