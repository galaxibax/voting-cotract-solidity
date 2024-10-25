import React, { useState, useEffect } from "react";
import ButtonTemplate from "../../components/button/button";
import { Link } from "react-router-dom";
import Web3 from "web3";
import NotificationDialog from "../../components/notification/notification";
import contractABI from '../../ABI.json'
import { useSelector, useDispatch } from 'react-redux'
import { saveContract } from "../../store/contractSlice";
import { saveAccount } from "../../store/accountSlice";

const Header = ({
  onData
}) => {

  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [web3, setWeb3] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

    } else {
      setErrorMessage("MetaMask is not installed");
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {

      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        const web3 = new Web3(window.ethereum);
        // const contract = await new web3.eth.Contract(contractABI, '0x2D552B878cd57A8f4EFdb4dcE829CB370F98DE74');
        const contract = await new web3.eth.Contract(contractABI, '0x3210aF1411A55739c177E4ec651267eD2c09aA18');
        await dispatch(saveContract(contract))
        await dispatch(saveAccount(accounts[0]))

      } catch (error) {
        setErrorMessage("Failed to connect MetaMask");
      }
    } else {
      setErrorMessage("MetaMask is not installed");
    }
  };

  const formatWalletAddress = (address) => {
    const firstThree = address?.slice(0, 7);
    const lastThree = address?.slice(-4);
    return `${firstThree}...${lastThree}`;
  }

  const diplayAccount = formatWalletAddress(account)

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {
        account &&
        <NotificationDialog
          props="Connected!"
        />
      }

      <div className="flex justify-between items-center py-[40px] bg-black max-w-screen-xl min-w-[375px] m-auto px-[5%] lg:px-[140px]">
        <Link to="/" className="flex items-center gap-3 hover:cursor-pointer">
          <img src="/images/logo.png" alt="logo" />
          <p className="text-white font-semibold text-lg">
            Locker.
          </p>
        </Link>

        <div className="block order-last  md:hidden ">
          <button
            className="flex items-center text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`${isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-4 md:justify-between md:w-1/2 md:ml-[5%] order-last md:order-none`} >
          <p className="text-sm p-[1px] text-[#717171] hover:text-white hover:border-b-[1px] hover:cursor-pointer border-b-white ">
            <Link to="/newlocker">
              Tax Locker
            </Link>
          </p>
          <p className="text-sm p-[1px] text-[#717171] hover:text-white hover:border-b-[1px] hover:cursor-pointer border-b-white ">
            <Link to="/proposal">
              Make a proposal
            </Link>
          </p>
          <p className="text-sm p-[1px] text-[#717171] hover:text-white hover:border-b-[1px] hover:cursor-pointer border-b-white ">
            Docs
          </p>
          <p className="text-sm p-[1px] text-[#717171] hover:text-white hover:border-b-[1px] hover:cursor-pointer border-b-white ">
            Twitter
          </p>
        </div>

        <div className="flex ">
          <ButtonTemplate
            onclick={() => connectWallet()}
            buttonStyle="text-sm "
            buttonText={`${account ? diplayAccount : "Connect Wallet"}`}
          />
        </div>
      </div>
    </>
  )
}

export default Header
