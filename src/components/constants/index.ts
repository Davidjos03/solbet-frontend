import { Connection } from "@solana/web3.js";

// Define the RPC endpoint
const endpoint = import.meta.env.VITE_RPC_ENDPOINT
    ? import.meta.env.VITE_RPC_ENDPOINT
    : "https://api.devnet.solana.com";

const connection = new Connection(endpoint, "confirmed");

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export {
    endpoint,
    connection,
    BACKEND_URL,
}

