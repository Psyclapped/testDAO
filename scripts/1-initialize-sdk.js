import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

// Importing and configing our .env file that
// we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// some quick checks to make sure our .env is working
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("Private key not found.");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.log("Alchemy API URL not found.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("Wallet address not found.");
}

// RPC URL, we'll use our alchemy api url from our .env file.
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
// your wallet private key.
// always keep this private, do not share it with anyone,
// add it to your .env file and don't commit that to github
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initialized by address:", address)
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// we're exporting the initialized thirdweb sdk so that
// we can use it in our other scripts
export default sdk;
