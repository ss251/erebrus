import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import {
  useNetworkMismatch,
  useNetwork,
  useAddress,
  ChainId,
  ConnectWallet,
  useSDK,
} from "@thirdweb-dev/react";
import axios from "axios";
import Head from "next/head";
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import { AuthContext } from "../AuthContext";

const transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const Mint = () => {
  
  const [isOwned, setIsOwned] = useState(false);
  const [balance, setBalance] = useState(false);
  const [isLoadingTx, setLoadingTx] = useState(false);
  const [error, setError] = useState(null);
  const [isMinted, setMinted] = useState(false);
  const isSignedIn = Cookies.get("platform_wallet");
  const [address, setAddress] = useState("");

  const transaction = {
    arguments: [],
    function:
      "0x75bcfe882d1a4d032ead2b47f377e4c95221594d66ab2bd09a61aded4c9d64f9::vpn3::user_mint_NFT",
    type: "entry_function_payload",
    type_arguments: [],
  };

  const mint = async () => {
    try {
      const pendingTransaction = await aptos.signAndSubmitTransaction(
        transaction
      );
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };
  

  if (!isSignedIn) {
    return (
      <>
        <Head>
          <title>Erebrus | Clients</title>
        </Head>
        <div className="flex justify-center mt-48 text-white bg-black h-screen">
          Please sign in to Erebrus to view your NFT
        </div>
        {/* <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg lg:mb-48"
                  onClick={mint}
                >
                  Mint Erebrus NFT
                </button> */}
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Erebrus | Clients</title>
      </Head>
      <div class="flex h-screen">
      <div className="w-1/2">
      <div className="text-white text-4xl ml-20 mt-20 mx-auto">Step into the Future of Internet 
Safety with 111 NFT VPN</div>
<div className="text-white text-xl ml-20 mt-10 mx-auto">3-Month Coverage</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">2 Reconfigurable Clients</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">Only at 1.11 APT</div>
<div className="text-white text-xl ml-20 mt-4 mx-auto">
Exceptional Value for Unmatched Security</div>
      {isOwned ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="mt-20 text-white flex flex-col justify-start items-center">
            {`Number of NFTs owned: ${balance}`}
            <img
              src="./image1.jpeg"
              alt="Mint Successful"
              className="w-64 h-64 mt-8 mb-8"
            ></img>
            {isLoadingTx ? (
              <div className="animate-spin text-white text-7xl">⛏</div>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-10 rounded-lg mt-20"
                  onClick={mint}
                >
                  Mint Erebrus NFT
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="mt-20 text-white flex flex-col justify-center items-center">
            {isLoadingTx ? (
              <div className="animate-spin text-white text-7xl">⛏</div>
            ) : (
              <>
                <button
                  className="bg-blue-500 text-white font-bold py-4 px-10 rounded-lg mr-auto ml-20"
                  onClick={mint}
                >
                  Mint Erebrus NFT
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
              </>
            )}
          </div>
        </motion.div>
      )}
      </div>

<div className="text-white w-1/4 ml-auto mr-40 mt-10"><img src="/111nft_gif.gif"/></div>
</div>
    </>
  );
};

export default Mint;