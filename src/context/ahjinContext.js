import { contractAddress, ahjinAbi } from "../utils/constants";
import { ethers } from "ethers";
import { useState, useEffect, createContext } from "react";
export const AjhinContext = createContext();

export const AjhinProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [buyModal, setBuyModal] = useState(false);
  const [tokenAmount, setTokenAmount] = useState();
  const [tokenBalance, setTokenBalance] = useState("");
  const [amountDue, setAmountDue] = useState();
  const [loading, setLoading] = useState(false);
  const closeBuyModal = () => {
    setTokenAmount();
    setBuyModal(!buyModal);
  };

  let { ethereum } = window;

  const getEthereumContract = () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signers = provider.getSigner();
        const transactionContract = new ethers.Contract(
          contractAddress,
          ahjinAbi,
          signers
        );
        return transactionContract;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const buyToken = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const ajhinContract = getEthereumContract();
      const transactionHash = await ajhinContract.mint(tokenAmount);
      await transactionHash.wait();
      setLoading(!loading);
      console.log(`success - ${transactionHash.hash}`);
    } catch (error) {
      console.log(error);
    }
  };

  const buyAssets = async (tokenAmountToBurn) => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const ajhinContract = getEthereumContract();
      const transactionHash = await ajhinContract.burn(tokenAmountToBurn);
      await transactionHash.wait();
      setLoading(!loading);
      console.log(`success - ${transactionHash.hash}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const ajhinContract = getEthereumContract();
      const balance = await ajhinContract.balanceOf(currentAccount);
      setTokenBalance(balance.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const sendEthInReward = async (receivingAddress) => {
    try {
      if (!ethereum) return alert("Please Install metamask.");
      const ajhinContract = getEthereumContract();
      const amount = "0.00001";
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: receivingAddress,
            gas: "0x5208", //21000 GWEI in decimal equivalent to hex value 0x5208
            value: parsedAmount._hex,
            amount: parsedAmount,
          },
        ],
      });

      const transactionHash = await ajhinContract.transferReward(
        currentAccount,
        receivingAddress,
        parsedAmount,
        "conguration you got reward"
      );
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`success - ${transactionHash.hash}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getBalance();
  }, [loading, currentAccount]);

  return (
    <AjhinContext.Provider
      value={{
        connectWallet,
        currentAccount,
        buyModal,
        setBuyModal,
        closeBuyModal,
        tokenAmount,
        setTokenAmount,
        amountDue,
        setAmountDue,
        buyToken,
        tokenBalance,
        buyAssets,
        sendEthInReward,
      }}
    >
      {children}
    </AjhinContext.Provider>
  );
};
