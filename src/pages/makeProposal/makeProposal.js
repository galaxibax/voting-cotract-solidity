import React, { useEffect, useState } from "react";
import ProposalMaker from "../../components/proposalMaker/proposalMaker";
import { useSelector } from "react-redux";

const MakeProposal = () => {

  const { contract } = useSelector((state) => state.contract)

  const [lockDuration, setLockDuration] = useState('')
  const [maxLockAmount, setMaxLockAmount] = useState('')
  const [LockedAmount, setLockedAmount] = useState('')

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
    }
  }, [])

  return (
    <>
      <div className="max-w-screen-xl m-auto px-[140px]">
        <div className="mt-[40px]">
          <p className="text-[20px] text-white text-center font-normal">
            Your Tax Locker
          </p>
        </div>
        <div className="mt-[10px]">
          <ProposalMaker
            avatarName="ethereum_img"
            tokenName="ETH"
            tokenAmount={LockedAmount.toString()}
            tokenNum={LockedAmount.toString()}
            unlockTime={lockDuration.toString()}
            holders="150"
            tokenVolume={(maxLockAmount.toString() * 2469.34).toFixed(3)}
            networkAvatar="ethereum_img"
            networkName="Ethereum"
          />
        </div>
      </div>
    </>
  )
}

export default MakeProposal
