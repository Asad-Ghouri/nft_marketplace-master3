import {
    ConnectWallet,
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useContractRead,
    useOwnedNFTs,
    useTokenBalance,
    Web3Button,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import { useContractMetadata, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Theme.module.css";

import Link from 'next/link'


import Homestyles from "../styles/Home.module.css";

import {
    Spinner
} from "@chakra-ui/react";

import { useRouter } from "next/router";


const DownloadLbac: NextPage = () => {
    const address = useAddress();

    const nftDropContractAddress = "0x68225df7c4df4d82ded8478daa74c2138da1f85b";
    const stakingContractAddress = "0xFAaa8258bB2a324498F203BAB77655bd1Bc1D7D0";
    const tokenContractAddress = "0x847fCadf5102Fa9E79F3c1D398Cf4275Ba781524";

    const { contract: nftDropContract } = useContract(
        nftDropContractAddress,
        "nft-drop"
    );
    const { contract: tokenContract } = useContract(
        tokenContractAddress,
        "token"
    );
    const { contract, isLoading } = useContract(stakingContractAddress);


    // const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);



    const { contract: LilBaby } = useContract('0x918f677b3ab4b9290ca96a95430fd228b2d84817');
    const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(LilBaby);
    const { data: ownedNFTs, isLoading: LilBabyLoading, error } = useOwnedNFTs(LilBaby, address);




    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { data: stakedTokens } = useContractRead(
        contract,
        "getStakeInfo",
        address
    );

    useEffect(() => {
        if (!contract || !address) return;

        async function loadClaimableRewards() {
            const stakeInfo = await contract?.call("getStakeInfo", address);
            setClaimableRewards(stakeInfo[1]);
        }

        loadClaimableRewards();
    }, [address, contract]);

    async function stakeNft(id: string) {
        if (!address) return;

        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );
        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }
        await contract?.call("stake", [id]);
    }



    function downloadImage(id: string) {
        // Fetch the image as a Blob
        fetch(`https://gateway.ipfscdn.io/ipfs/QmXJKxGKFYWPcCWwhrfLn3G5ZS2ux9iHUU3M6X3UtbPq1h/${id}.png`)
            .then(response => response.blob())
            .then(blob => {
                // Create a URL for the Blob
                const url = URL.createObjectURL(blob);

                // Create a new <a> element with the URL as its href attribute
                const link = document.createElement('a');
                link.href = url;

                // Set the download attribute and filename of the link
                link.download = 'image.jpg';

                // Trigger a click on the link element
                link.click();

                // Release the URL object
                URL.revokeObjectURL(url);
            });
    }

    async function downloadJson(id: string) {
        // Fetch JSON data from a URL
        const response = await fetch(`https://gateway.ipfscdn.io/ipfs/QmaAY3aQe8a8tDt24RaQtQX7pMGRQoarGF6pVYn5cpLyLX/${id}`);
        const jsonData = await response.json();

        // Create a Blob object from the JSON data
        const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

        // Create a link element with the Blob URL and trigger a click to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.json';
        link.click();
    }
    // if (isLoading) {
    //     return <div>
    //         <div className={styles.loading}>
    //             <Spinner
    //                 thickness="4px"
    //                 speed="0.65s"
    //                 emptyColor="gray.200"
    //                 color="blue.500"
    //                 size="xl"
    //             />
    //         </div>
    //     </div>;
    // }


    const [closeBtn1, setcloseBtn1] = useState(true);
    const [closeBtn, setcloseBtn] = useState(true);


    const [changeColor, setchangeColor] = useState(1);

    const router = useRouter();


    function LilListing() {
        // setchangeColor(5);
        router.push("/Listing");
    }

    function MutantListing() {
        setchangeColor(8);
        router.push("/ListMutant");
    }

    function LilStake() {
        setchangeColor(2);
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
        // setchangeColor(3);
        router.push("/SwapCoin");
    }

    function swapnft() {
        // setchangeColor(4);
        router.push("/SwapNFT");
    }

    function DownloadLbac() {
        // router.push("/DownloadLbac")
    }

    function presale() {
        // setchangeColor(7);
        router.push("/EthToNana");
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
                                            ? "flex items-center asa justify-between py-2 px-3 rounded-md cursor-pointer transition hover:bg-opacity-25  po0"
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
                                    <span className="font-hand text-xl fg fgg1">PreSale</span>
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
                            </li>


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
                                    <span className="font-hand text-xl fg fgg1">PreSale</span>
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
                            </li>

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
            <h3 className="user-frs swap-frs">Download LBAC</h3>
            <Link href="/Marketplace">
                <div className={Homestyles.dflex + " " + Homestyles.dfl + " " + Homestyles.userfrs}>
                    <button>Back to Homepage</button>
                </div>
            </Link>

            <div className={address ? styles.container : styles.container + " " + styles.ccbtn}>



                {!address ? (
                    <ConnectWallet />
                ) : (
                    <>

                        {/* <h2 className="unstakentext">Your Unstaked NFTs</h2> */}
                        <div className={styles.nftBoxGrid + " " + styles.nftLBACGrid}>
                            {!LilBabyLoading ?
                                ownedNFTs?.map((nft) => (
                                    <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                        <ThirdwebNftMedia
                                            metadata={nft.metadata}
                                            className={styles.nftMedia}
                                        />
                                        <h3>{nft.metadata.name}</h3>

                                        <button
                                            className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn}`}

                                            onClick={() => downloadImage(nft.metadata.id)}
                                        >
                                            Download Image
                                        </button>

                                        <button
                                            className={`${styles.mainButton} ${styles.spacerBottom} ${styles.listbtn}`}

                                            onClick={() => downloadJson(nft.metadata.id)}
                                        >
                                            Download Json
                                        </button>
                                    </div>
                                ))
                                :
                                <div className={styles.loading}>
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                    />
                                </div>
                            }
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DownloadLbac;