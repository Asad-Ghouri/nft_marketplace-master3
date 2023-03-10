import {
    ThirdwebNftMedia,
    useAddress,
    useMetamask,
    useTokenBalance,
    useOwnedNFTs,
    useContract,
    useContractRead,
    useContractWrite,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { ConnectWallet, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Theme.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import Link from "next/link";
import Image from "next/image";

import {
    Spinner
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import Homestyles from "../styles/Home.module.css";


const nftDropContractAddress = "0x918f677b3ab4b9290ca96a95430fd228b2d84817";

// const stakingContractAddress1 = "0x918f677b3ab4b9290ca96a95430fd228b2d84817";

const marketplaceContractAddress = "0x0e7B309Ba44d42f978655aE51789619AD7e1E2d9";

const token_address = "0x847fCadf5102Fa9E79F3c1D398Cf4275Ba781524";



import { useContractMetadata, useNFTs } from "@thirdweb-dev/react";


const Stake: NextPage = () => {

    const connectWithMetamask = useMetamask();
    const address = useAddress();



    const { contract } = useContract('0x918f677b3ab4b9290ca96a95430fd228b2d84817');
    const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);
    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);


    const [closeBtn1, setcloseBtn1] = useState(true);
    const [closeBtn, setcloseBtn] = useState(true);


    const { contract: mutant } = useContract('0x3B45542f6C97FE7f7aA3BB055c95e93B2c0437ED');
    const { data: mutantmetadata, isLoading: mutantloadingMetadata } = useContractMetadata(mutant);
    const { data: mutantownd, isLoading: mutantloading, error: mutanterror } = useOwnedNFTs(mutant, address);
    // ownedNFTs

    const { contract: marketcontract } = useContract(
        "0x0e7B309Ba44d42f978655aE51789619AD7e1E2d9",
        "marketplace"
    );

    const [ListingValue, setListingValue] = useState<any>("200");


    console.log("listingvalue is " + ListingValue)

    // Contract Hooks
    const { contract: nftDropContract } = useContract(
        nftDropContractAddress,
        "nft-drop"
    );

    const [stakedNfts, setStakedNfts] = useState<any[]>([]);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    const { data, isLoading: approveLoading } = useContractRead(contract, "isApprovedForAll", address, marketplaceContractAddress)

    const { mutateAsync: setApprovalForAll, isLoading: allapprove } = useContractWrite(marketcontract, "setApprovalForAll")

    async function getprice(id: string) {
        const listings = await marketcontract.getActiveListings();
        // console.log("value is :" + listings[id].buyoutPrice);
        return listings[id].buyoutPrice;
    }



    async function listitem(id: string) {
        const gp = ListingValue;
        console.log("getvprice is " + gp);
        if (gp || !gp) {
            if (!address) return;

            const call = async () => {
                try {
                    const data = await setApprovalForAll([marketplaceContractAddress, true]);
                    console.info("contract call successs", data);
                } catch (err) {
                    console.error("contract call failure", err);
                }
            }
            // const stake = await contract?.call("stake", id);
            const listing = {
                // address of the NFT contract the asset you want to list is on
                assetContractAddress: nftDropContractAddress,
                // token ID of the asset you want to list
                tokenId: id,
                // when should the listing open up for offers
                startTimestamp: new Date(),
                // how long the listing will be open for
                listingDurationInSeconds: 886400,
                // how many of the asset you want to list
                quantity: 1,
                // address of the currency contract that will be used to pay for the listing
                currencyContractAddress: token_address,
                // how much the asset will be sold for
                buyoutPricePerToken: ListingValue,
            };
            const tx = await marketcontract.direct.createListing(listing);
            const receipt = tx.receipt; // the transaction receipt
            const listingId = tx.id; // the id of the newly created listing
        } else {
            console.log("gp is null");
        }
    }

    const [changeColor, setchangeColor] = useState(1);

    const router = useRouter();


    function LilListing() {
        // setchangeColor(1);
        router.push("/Listing");
    }

    function MutantListing() {
        // setchangeColor(8);
        router.push("/ListMutant");
    }

    function LilStake() {
        // setchangeColor(2);
        router.push("/StakingBaby");
        // alert("contract address is not deployed yet");
    }

    function MutantStaking() {
        // setchangeColor(5);
        router.push("/Nana");
    }

    function raffel() {
        // setchangeColor(6);
        router.push("/Raffle");
    }

    function swapcoin() {
        setchangeColor(3);
        router.push("/SwapCoin");
    }

    function swapnft() {
        // setchangeColor(4);
        router.push("/SwapNFT");
    }

    function presale() {
        // setchangeColor(7);
        router.push("/EthToNana");
    }

    function DownloadLbac() {
        // router.push("/DownloadLbac")
    }

    const [open, setOpen] = useState(false);

    const [stakeopen, stakesetOpen] = useState(false);

    const [coinopen, coinsetOpen] = useState(false);



    const coinhandleOpen = () => {
        setOpen(false);
        stakesetOpen(false)
        coinsetOpen(!coinopen);
    };


    return (
        <>

            <div className="max-h-full px-3 space-y-5 overflow-y-auto bsbs dfs">
                <div className="lg:block hfmm">
                    <div className="bg-coal-dark border-2 border-coal-light rounded-xl fmm">
                        <ul className="bg-coal-light bg-opacity-25 rounded-xl divide-y divide-coal-light fmm1">



                            <li role="button" className="p-1 ucc menu-item">
                                <a
                                    onClick={LilListing}
                                    className={
                                        changeColor != 5
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:text-xenos-500 hover:bg-coal-light po0"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500 po0"
                                    }
                                >
                                    <span className="font-hand text-xl hover:text-red-500 fg">LISTING</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                    // style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>

                            <li role="button" className="p-1 ucc menu-item">
                                <a
                                    onClick={MutantStaking}
                                    className={
                                        changeColor != 5
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light po0"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500 po0"
                                    }
                                >
                                    <span className="font-hand text-xl fg">CLAIM NANA</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>
                            <li role="button" className="">

                                <div className="dropdown hover:bg-opacity-25 hover:bg-coal-light" onClick={coinhandleOpen}>
                                    <button className="fg" >SWAP</button>
                                    {coinopen ? (
                                        <ul className="menuss">
                                            <li className="menu-item p-1 ucc">

                                                <a
                                                    onClick={swapcoin}
                                                    className={
                                                        changeColor != 3
                                                            ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition asa hover:bg-opacity-25 hover:bg-coal-light mk"
                                                            : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition asa hover:bg-opacity-25 hover:bg-coal-light text-xenos-500 mk"
                                                    }
                                                >
                                                    <span className="font-hand text-xl fg">Swap Coin</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                                    >
                                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                                    </svg>
                                                </a>

                                            </li>
                                            <li role="button" className="p-1 ucc menu-item">
                                                <a
                                                    onClick={swapnft}
                                                    className={
                                                        changeColor != 4
                                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                                    }
                                                >
                                                    <span className="font-hand text-xl fg fgg1">Swap NFT</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                                        style={{ display: "none" }}
                                                    >
                                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    ) : null}
                                </div>

                            </li>


                            <li className="p-1 ucc">
                                <a
                                    onClick={raffel}
                                    className={
                                        changeColor != 6
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">Raffle</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>

                            <li className="p-1 ucc">
                                <a
                                    onClick={presale}
                                    className={
                                        changeColor != 7
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">Eth To Nana</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>
                            {/* <li className="p-1 ucc">
                                <a
                                    onClick={DownloadLbac}
                                    className={
                                        changeColor != 7
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">DownloadLbac</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl pt-pb dddn">
                        <div className="flex items-center justify-between py-3 px-4 border-b border-coal-light">
                            <span className="text-sm">Listing type</span>
                        </div>
                        <div>
                            <ul className="">
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                                        <span>All types</span>
                                        <input
                                            type="checkbox"
                                            className="bg-coal-light fill-coal-dark transition duration-100 srg ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light sr"
                                        />
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                                        <span>Buy now</span>
                                        <input
                                            defaultValue="buy_now"
                                            // type="radio"
                                            type="checkbox"
                                            className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                                        />
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer bg-coal-light bg-opacity-75 text-white">
                                        <span>Raffle</span>
                                        <input
                                            defaultValue="raffle"
                                            // type="radio"
                                            type="checkbox"
                                            className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                                        />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl dddn">
                        <div>
                            <ul className="divide-y divide-coal-light">
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-gray-400">
                                        <span>Show out of stock</span>
                                        <span
                                            role="checkbox"
                                            aria-checked="true"
                                            tabIndex={0}
                                            className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 p-1 bg-coal-light rounded-full border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50"
                                        >
                                            {/* <input type="hidden" /> */}
                                            <span className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"></span>

                                            <span
                                                onClick={() => setcloseBtn1(!closeBtn1)}
                                                className={
                                                    closeBtn1 == true
                                                        ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                                        : "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs bg-xenos-500"
                                                }
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn1(!closeBtn1)}
                                                className={
                                                    closeBtn1 == true
                                                        ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                                                        : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full  shadow flex items-center justify-center text-xenos-500 text-xs"
                                                }
                                            ></span>
                                        </span>
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-white">
                                        <span>Show ended sales</span>
                                        <span
                                            tabIndex={0}
                                            className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 p-1 bg-coal-light rounded-full"
                                        >
                                            <input type="hidden" defaultValue="true" />
                                            <span
                                                aria-checked="true"
                                                className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn(!closeBtn)}
                                                className={
                                                    closeBtn == true
                                                        ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                                        : "inline-block rounded-full bg-xenos-500 h-3 w-3 flex items-center justify-center text-xenos-500 text-gray-400 text-xs"
                                                }
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn(!closeBtn)}
                                                className={
                                                    closeBtn == true
                                                        ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                                                        : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full shadow flex items-center justify-center text-xenos-500 text-xs"
                                                }
                                            ></span>
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-h-full px-3 space-y-5 overflow-y-auto bsbs d-fm">
                <div className="lg:block hfmm">
                    <div className="bg-coal-dark border-2 border-coal-light rounded-xl fmm">
                        <ul className="bg-coal-light bg-opacity-25 rounded-xl divide-y divide-coal-light fmm1">
                            <li role="button" className="p-1 ucc">
                                <button
                                    onClick={LilListing}
                                    className={
                                        changeColor == 1
                                            ? "flex items-center hover:bg-opacity-25 hover:bg-coal-light asa justify-between py-2 px-3 rounded-md cursor-pointer transition bg-coal-light bg-opacity-75 mk"
                                            : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer asa text-xenos-500 bg-opacity-25   bg-coal-light mk"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg2">LISTING</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </button>
                            </li>

                            <li className="p-1 ucc">
                                <a
                                    onClick={MutantStaking}
                                    className={
                                        changeColor != 5
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light po0"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500 po0"
                                    }
                                >
                                    <span className="font-hand text-xl fg">CLAIM NANA</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-1 ucc">
                                <a
                                    onClick={swapcoin}
                                    className={
                                        changeColor != 3
                                            ? "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition asa hover:bg-opacity-25 hover:bg-coal-light mk"
                                            : "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition asa hover:bg-opacity-25 hover:bg-coal-light text-xenos-500 mk"
                                    }
                                >
                                    <span className="font-hand text-xl fg">Swap Coin</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>
                            <li className="p-1 ucc">
                                <a
                                    onClick={swapnft}
                                    className={
                                        changeColor != 4
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">Swap NFT</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>

                            <li className="p-1 ucc">
                                <a
                                    onClick={raffel}
                                    className={
                                        changeColor != 6
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">Raffle</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>

                            <li className="p-1 ucc">
                                <a
                                    onClick={presale}
                                    className={
                                        changeColor != 7
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">Eth To Nana</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li>

                            {/* <li className="p-1 ucc">
                                <a
                                    onClick={DownloadLbac}
                                    className={
                                        changeColor != 7
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light"
                                            : "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25 hover:bg-coal-light text-xenos-500"
                                    }
                                >
                                    <span className="font-hand text-xl fg fgg1">DownloadLbac</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="-mr-1 w-5 h-5 fill-current transition icon sprite-icons"
                                        style={{ display: "none" }}
                                    >
                                        <use href="/_nuxt/90542362d159cf028adfa51646312af4.svg#i-chevron-right"></use>
                                    </svg>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl pt-pb dddn">
                        <div className="flex items-center justify-between py-3 px-4 border-b border-coal-light">
                            <span className="text-sm">Listing type</span>
                        </div>
                        <div>
                            <ul className="">
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                                        <span>All types</span>
                                        <input
                                            // onClick={() => setradiochangeColor(false)}
                                            // type="radio"
                                            type="checkbox"
                                            // onChange={this.handleCheck} defaultChecked={this.state.checked}
                                            className="bg-coal-light fill-coal-dark transition duration-100 srg ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light sr"
                                        />
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer text-gray-400 hover:bg-opacity-25 hover:bg-coal-light">
                                        <span>Buy now</span>
                                        <input
                                            defaultValue="buy_now"
                                            // type="radio"
                                            type="checkbox"
                                            className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                                        />
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm rounded-md cursor-pointer bg-coal-light bg-opacity-75 text-white">
                                        <span>Raffle</span>
                                        <input
                                            defaultValue="raffle"
                                            // type="radio"
                                            type="checkbox"
                                            className="bg-coal-light fill-coal-dark transition duration-100 ease-in-out shadow-sm border-2 focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 text-xenos-500 !border-coal-light"
                                        />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-coal-dark border-2 border-coal-400 md:border-coal-light rounded-xl dddn">
                        <div>
                            <ul className="divide-y divide-coal-light">
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-gray-400">
                                        <span>Show out of stock</span>
                                        <span
                                            role="checkbox"
                                            aria-checked="true"
                                            tabIndex={0}
                                            className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 p-1 bg-coal-light rounded-full border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50"
                                        >
                                            {/* <input type="hidden" /> */}
                                            <span className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"></span>

                                            <span
                                                onClick={() => setcloseBtn1(!closeBtn1)}
                                                className={
                                                    closeBtn1 == true
                                                        ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                                        : "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs bg-xenos-500"
                                                }
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn1(!closeBtn1)}
                                                className={
                                                    closeBtn1 == true
                                                        ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                                                        : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full  shadow flex items-center justify-center text-xenos-500 text-xs"
                                                }
                                            ></span>
                                        </span>
                                    </label>
                                </li>
                                <li className="px-1">
                                    <label className="flex items-center justify-between py-3 md:py-2 px-3 text-sm hover:bg-opacity-25 hover:bg-coal-light rounded-md cursor-pointer text-white">
                                        <span>Show ended sales</span>
                                        <span
                                            tabIndex={0}
                                            className="-mr-1 relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 border-2 border-transparent focus:ring-2 focus:ring-xenos-500 focus:outline-none focus:ring-opacity-50 p-1 bg-coal-light rounded-full"
                                        >
                                            <input type="hidden" defaultValue="true" />
                                            <span
                                                aria-checked="true"
                                                className="inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn(!closeBtn)}
                                                className={
                                                    closeBtn == true
                                                        ? "inline-block rounded-full h-3 w-3 flex items-center justify-center text-gray-400 text-xs"
                                                        : "inline-block rounded-full bg-xenos-500 h-3 w-3 flex items-center justify-center text-xenos-500 text-gray-400 text-xs"
                                                }
                                            ></span>
                                            <span
                                                onClick={() => setcloseBtn(!closeBtn)}
                                                className={
                                                    closeBtn == true
                                                        ? "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full bg-xenos-500 shadow flex items-center justify-center text-xenos-500 text-xs"
                                                        : "inline-block absolute transform translate-x-full transition ease-in-out duration-200 h-3 w-3 rounded-full shadow flex items-center justify-center text-xenos-500 text-xs"
                                                }
                                            ></span>
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <img
                className="iimg"
                src="https://gateway.pinata.cloud/ipfs/QmaG5foqVJSoxfVHofoD2Pa4RLHSUcmrQ7Nw1vM5mL1Gqn?_gl=1*oov2r*_ga*MTM0NzM3MDM2OC4xNjczNjQ0MzY4*_ga_5RMPXG14TE*MTY3NzI0NzE2Ny4xMy4xLjE2NzcyNDcyMzEuNjAuMC4w"
                alt=""
            />
            <h3 className="user-frs swap-frs">LISTING</h3>
            <Link href="/Marketplace">
                <div className={Homestyles.dflex + " " + Homestyles.dfl + " " + Homestyles.userfrs}>
                    <button>Back to Homepage</button>
                </div>
            </Link>

            <div className={address ? styles.container : styles.container + " " + styles.ccbtn}>

                <h1 className={!isLoading ? styles.yb : styles.dn}>LIST YOUR NFTS!</h1>


                {!address ? (
                    <>

                        {/* <h1 className={styles.yb}>LIST YOUR BABY AND MUTANT NFT!</h1> */}
                        <h1 className="yn">You need an Etherium wallet to use Ape Club</h1>
                        <button
                            className={styles.mainButton}
                            id="autom"
                            onClick={connectWithMetamask}
                        >
                            Connect Wallet
                        </button>
                    </>
                ) : (
                    <>

                        {/* <h1 className={styles.yb}>LIST YOUR BABY  NFT!</h1> */}
                        {/* <hr className={`${styles.divider} ${styles.spacerTop}`} />

                        <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}

                        <h2 className={!isLoading ? "listtext" : "dn"}>(Do not list one nft multiple time)</h2>

                        {!isLoading ?
                            <div className="table-size">
                                <div className={styles.nftBoxGrid1}>
                                    <div className={styles.nftBoxGrid}>
                                        {ownedNFTs?.map((nft) => (
                                            <div
                                                className={styles.nftBox}
                                                key={nft.metadata.id.toString()}
                                            >
                                                <ThirdwebNftMedia
                                                    metadata={nft.metadata}
                                                    className={styles.nftMedia}
                                                />
                                                <h3>{nft.metadata.name}</h3>
                                                <form>
                                                    <input type="text" onChange={e => {
                                                        setListingValue(e.target.value)
                                                    }} className={styles.listingInput} placeholder="Enter listing price" />
                                                </form>
                                                <button
                                                    className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn}`}
                                                    onClick={() => listitem(nft.metadata.id)}
                                                >
                                                    List
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={styles.loadings}>
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            </div>
                        }
                    </>
                )}
            </div>




            <div className={styles.container + " " + styles.bbcontainer}>
                {/* <h1 className={styles.yb}>LIST YOUR MUTANT NFT!</h1> */}

                {/* <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}

                {!address ? (
                    <>
                        {/* <h1 className="yn">You need an Etherium wallet to use Ape Club</h1>
                        <button
                            className={styles.mainButton}
                            id="autom"
                            onClick={connectWithMetamask}
                        >
                            Connect Wallet
                        </button> */}
                    </>
                ) : (
                    <>
                        <hr className={`${styles.divider} ${styles.spacerTop}`} />

                        <hr className={`${styles.divider} ${styles.spacerTop}`} />
                        {/* <hr className="hr" /> */}


                        {/* <h1 className={styles.yb}>LIST YOUR MUTANT NFT!</h1>
                        <h2 className="listtext">(Do not list one nft multiple time)</h2> */}

                        {
                            !mutantloading ?

                                <div className={styles.nftBoxGrid1}>
                                    <div className={styles.nftBoxGrid + " " + styles.mutantcontainer}>
                                        {mutantownd?.map((nft) => (
                                            <div
                                                className={styles.nftBox}
                                                key={nft.metadata.id.toString()}
                                            >
                                                <ThirdwebNftMedia
                                                    metadata={nft.metadata}
                                                    className={styles.nftMedia}
                                                />
                                                <h3>{nft.metadata.name}</h3>
                                                <form>
                                                    <input type="text" onChange={e => {
                                                        setListingValue(e.target.value)
                                                    }} className={styles.listingInput} placeholder="Enter listing price" />
                                                </form>
                                                <button
                                                    className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn}`}
                                                    onClick={() => listitem(nft.metadata.id)}
                                                >
                                                    List
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div className={styles.loadings}>
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                    />
                                </div>
                        }

                    </>
                )}
            </div>
        </>
    );
};

export default Stake;