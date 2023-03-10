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


const nftDropContractAddress = "0x3B45542f6C97FE7f7aA3BB055c95e93B2c0437ED";

const marketplaceContractAddress = "0x0e7B309Ba44d42f978655aE51789619AD7e1E2d9";

const token_address = "0x847fCadf5102Fa9E79F3c1D398Cf4275Ba781524";



import { useContractMetadata, useNFTs } from "@thirdweb-dev/react";


const Stake: NextPage = () => {

  const connectWithMetamask = useMetamask();
  const address = useAddress();



  const { contract } = useContract('0x3B45542f6C97FE7f7aA3BB055c95e93B2c0437ED');
  const { data: metadata, isLoading: loadingMetadata } = useContractMetadata(contract);
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);



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
  // const [currentbal, setcurrentbal] = useState<string>();



  const { data, isLoading: approveLoading } = useContractRead(contract, "isApprovedForAll", address, marketplaceContractAddress)

  const { mutateAsync: setApprovalForAll, isLoading: allapprove } = useContractWrite(marketcontract, "setApprovalForAll")


  async function getprice(id: string) {
    const listings = await marketcontract.getActiveListings();
    console.log("value is :" + listings[id].buyoutPrice);
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

  if (isLoading) {
    return <div>
      <div className={styles.loading}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </div>;
  }

  return (
    <>
      <Link href="/">
        <div className="d-flex">
          <h3>Go To Dashboard</h3>
        </div>
      </Link>
      <div className={styles.container}>
        <h1 className={styles.yb}>LIST YOUR MUTANT NFT!</h1>

        {/* <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}

        {!address ? (
          <>
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
            {/* <hr className={`${styles.divider} ${styles.spacerTop}`} />

            <hr className={`${styles.divider} ${styles.spacerTop}`} /> */}

            <h2 className="listtext">(Do not list one nft multiple time)</h2>

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
          </>
        )}
      </div>
    </>
  );
};

export default Stake;
