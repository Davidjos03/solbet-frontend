import { Connection } from "@solana/web3.js";

const PROGRAM_ID = import.meta.env.VITE_PROGRAM_ID;
const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;
const PINATA_PUBLIC_KEY = import.meta.env.VITE_PINATA_PUBLIC_KEY;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const CLUSTER = import.meta.env.VITE_CLUSTER;
const TEAM_WALLET = import.meta.env.VITE_TEAM_WALLET;
const PLATFORM_FEE = Number(import.meta.env.VITE_PLATFORM_FEE) || 0;
const ROUND_DURATION = Number(import.meta.env.VITE_ROUND_DURATION) || 0;

const connection = new Connection(
    RPC_ENDPOINT,
    "confirmed"
)

export {
    PROGRAM_ID,
    RPC_ENDPOINT,
    PINATA_PUBLIC_KEY,
    BACKEND_URL,
    SOCKET_URL,
    CLUSTER,
    TEAM_WALLET,
    PLATFORM_FEE,
    ROUND_DURATION,
    connection
}