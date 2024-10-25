import React, { useEffect, useState } from "react";
import LockStateShow from "../../components/lockStateShow/lockStateShow";
import ButtonTemplate from "../../components/button/button";
import { LiaSearchSolid } from "react-icons/lia"
import DetailShow from "../../components/detailShow/detailShow";
import CustomSelect from "../../components/selectBtn/selectBtn";
import { useNavigate } from "react-router-dom";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import axios from 'axios';
const MainPage = () => {

	const navigate = useNavigate()

	const options = [
		{
			avatar: '/images/ethereum_img.png',
			label: 'Ethereum',
		},
		{
			avatar: '/images/ethereum_img.png',
			label: 'Solana',
		},
		{
			avatar: '/images/ethereum_img.png',
			label: 'Bitcoin',
		},
	];

	const moveTo = () => {
		navigate('/newlocker')
	}

	const [newLockedDisplay, setNewLockedDisplay] = useState({})
	const [unLockSoonDisplay, setUnLockSoonDisplay] = useState({})
	const [unLockedRecentDisplay, setUnLockedRecentDisplay] = useState({})
	const [allData, setAllData] = useState([])

	const getLockData = async () => {
		const newLocked = await axios.get(`${process.env.REACT_APP_API_URL}/getLock/new`)
		setNewLockedDisplay(newLocked?.data)
		const unLockSoon = await axios.get(`${process.env.REACT_APP_API_URL}/getLock/unlocksoon`)
		setUnLockSoonDisplay(unLockSoon?.data)
		const unLockedRecent = await axios.get(`${process.env.REACT_APP_API_URL}/getLock/unlocked`)
		setUnLockedRecentDisplay(unLockedRecent?.data)
		const getAllData = await axios.get(`${process.env.REACT_APP_API_URL}/getLock/alldata`)
		setAllData(getAllData?.data)
	}

	let sumLockAmount = 0;
	allData?.map((item) => {
		sumLockAmount = sumLockAmount + item?.lockedAmount / 1
	})

	useEffect(() => {
		getLockData()
	}, [])

	const timeSortDis = () => {
		console.log("hi");
	}

	return (
		<>
			<div className="relative pb-[70px] ">
				<div className=" max-w-screen-xl m-auto mt-[20px] px-[5%] lg:px-[140px] relative z-10" >
					<div className="flex flex-col md:flex-row gap-2 justify-center items-center lg:justify-between text-white " >

						<LockStateShow
							nowLockState="New Tax Locked"
							tokenName="Ethereum"
							lockedAmount={`$ ${newLockedDisplay.lockedAmount ? newLockedDisplay.lockedAmount : 0}`}
							unlockedTime={`${newLockedDisplay.unLockTime ? newLockedDisplay.unLockTime : 0} Days`} />

						<LockStateShow
							nowLockState="Unlocking Soon"
							tokenName="Ethereum"
							lockedAmount={`$ ${unLockSoonDisplay.lockedAmount ? unLockSoonDisplay.lockedAmount : 0}`}
							unlockedTime={`${unLockSoonDisplay.unLockTime ? unLockSoonDisplay.unLockTime : 0} Days`} />

						<LockStateShow nowLockState="Recently Unlocked"
							tokenName="Ethereum"
							lockedAmount={`$ ${unLockedRecentDisplay.lockedAmount ? unLockedRecentDisplay.lockedAmount : 0}`}
							unlockedTime={`${unLockedRecentDisplay.unLockTime ? unLockedRecentDisplay.unLockTime : 0} Days`} />

					</div>

					<div className="mt-[60px] mx-auto" >
						<ButtonTemplate
							onclick={moveTo}
							buttonStyle="m-auto"
							buttonText="Create a new Tax Locker" />
					</div>

					<div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-[20px]" >
						<div className="flex gap-1 sm:gap-5 flex-col sm:flex-row w-full mt-[20px] items-center justify-between" >
							<div
								onClick={moveTo}
								className="flex w-full sm:w-1/4 bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] h-[40px] px-8 justify-center items-center hover:cursor-pointer hover:bg-hover-gradient" >
								<p className="font-semibold text-[14px] text-white text-center">
									Tax Locker
								</p>
							</div>

							<div className="relative w-full flex items-center h-[40px] rounded-[10px] border-[1px] border-[#FFFFFF33] bg-[#0000004D]">
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<LiaSearchSolid aria-hidden="true" className="h-5 w-5 text-white" />
								</div>
								<input
									id="search"
									name="search"
									type="text"
									className="block w-full rounded-[10px] border-0 h-full pl-10 px-3 text-white bg-[#0000004D]"
								/>
							</div>

							<div className="w-full md:w-1/4 mt-5 sm:mt-0">
								<CustomSelect
									options={options}
								/>
							</div>
						</div>

						<div className="flex flex-row md:flex-col justify-center items-center bg-custom-gradient rounded-[10px] border-[1px] border-[#FFFFFF33] h-auto md:h-[60px] text-center text-white text-[14px] w-full md:w-[22%] px-[1%] py-2 md:py-0 gap-2 md:gap-0" >
							<p>
								Total Tax Lockers
							</p>
							<p>
								{sumLockAmount}
							</p>
						</div>
					</div>

					<div className="hidden sm:flex justify-between items-center w-full mt-2.5 pl-5 none">
						<div className="w-[20%]"></div>
						<div className="w-[15%] flex gap-1 justify-center items-center">
							<p className="text-[12px] font-bold text-white">
								Tax Locked Amount
							</p>
							<span className="text-white text-[12px] font-bold">
								<FaAngleUp />
								<FaAngleDown />
							</span>
						</div>
						<div className="w-[15%] flex gap-1 justify-center items-center">
							<p className="text-[12px] font-bold text-white">
								Unlock Time
							</p>
							<span className="text-white text-[12px] font-bold">
								<div onClick={timeSortDis}>
									<FaAngleUp />
								</div>
								<div>
									<FaAngleDown />
								</div>
							</span>
						</div>
						<div className="w-[15%] flex gap-1 justify-center items-center">
							<p className="text-[12px] font-bold text-white">
								Holders
							</p>
							<span className="text-white text-[12px] font-bold">
								<FaAngleUp />
								<FaAngleDown />
							</span>
						</div>
						<div className="w-[15%] flex gap-1 justify-center items-center">
							<p className="text-[12px] font-bold text-white">
								Token Volume
							</p>
							<span className="text-white text-[12px] font-bold">
								<FaAngleUp />
								<FaAngleDown />
							</span>
						</div>
						<div className="w-[20%] flex justify-center items-center">
							<p className="text-[12px] font-bold text-white">
								Network
							</p>
						</div>
					</div>

					<div className="w-full mt-1">
						<div className="flex flex-col gap-1 sm:gap-2.5">
							{
								allData.length ?
									allData?.map((item, key) => (
										<DetailShow
											avatarName="ethereum_img"
											tokenName={`${item?.tokenName ? item?.tokenName : "ethereum"}`}
											tokenAmount={item?.lockedAmount * 4926.34}
											tokenNum={`${item?.lockedAmount ? item?.lockedAmount : 0}`}
											unlockTime={`${item?.unLockTime ? item?.unLockTime : 0}`}
											holders={`${item?.holders ? item?.holders : 0}`}
											tokenVolume={`${item?.maxAmount ? item?.maxAmount * 4926.34 : 0}`}
											networkAvatar="ethereum_img"
											networkName={`${item?.network ? item?.network : "ether"}`}
										/>
									)) : <>
										<DetailShow
											avatarName="ethereum_img"
											tokenName="ethereum"
											tokenAmount="0"
											tokenNum="0"
											unlockTime="0"
											holders="0"
											tokenVolume="0"
											networkAvatar="ethereum_img"
											networkName="ether"
										/>
										<DetailShow
											avatarName="ethereum_img"
											tokenName="ethereum"
											tokenAmount="0"
											tokenNum="0"
											unlockTime="0"
											holders="0"
											tokenVolume="0"
											networkAvatar="ethereum_img"
											networkName="ether"
										/>
										<DetailShow
											avatarName="ethereum_img"
											tokenName="ethereum"
											tokenAmount="0"
											tokenNum="0"
											unlockTime="0"
											holders="0"
											tokenVolume="0"
											networkAvatar="ethereum_img"
											networkName="ether"
										/></>
							}

						</div>
					</div>
				</div >

				<div className="absolute left-0 bottom-0 w-full">
					<div className="flex justify-between w-full">
						{/* <img src="/images/main_bottom_left.png" className="" />
						<img src="/images/main_bottom_right.png" className="" /> */}
					</div>
				</div>
			</div >
		</>
	)
}

export default MainPage