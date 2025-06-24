import { connection } from "@/constants/envConstants";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getBalance = async (publicKey: PublicKey) => {
    try {
        const lamportsBalance = await connection.getBalance(publicKey);
        console.log("🚀 ~ getBalance ~ lamportsBalance:", lamportsBalance)
        return lamportsBalance / LAMPORTS_PER_SOL;
    } catch (error) {
        console.error('Error fetching balance:', error);
        return 0
    }
}

export const getSolPrice = async () => {
    try {
        const response = await fetch(
            `https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112`
        );
        const data: { data: { [key: string]: { price: number } } } =
            await response.json();
        const solPrice = Number(
            data.data["So11111111111111111111111111111111111111112"].price
        );
        return solPrice;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}