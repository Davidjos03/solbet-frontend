import { connection } from "@/constants/envConstants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async (publicKey: PublicKey) => {
    try {
        const lamportsBalance = await connection.getBalance(publicKey);
        return lamportsBalance / LAMPORTS_PER_SOL;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return 0
    }
}