const PROGRAM_ID = import.meta.env.VITE_PROGRAM_ID;
const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;
const PINATA_PUBLIC_KEY = import.meta.env.VITE_PINATA_PUBLIC_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';


export { PROGRAM_ID, RPC_ENDPOINT, PINATA_PUBLIC_KEY, BACKEND_URL, SOCKET_URL }