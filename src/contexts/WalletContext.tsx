import React, {
    useMemo,
    ReactNode,
    useState,
    createContext,
    useContext,
} from "react";
import {
    ConnectionProvider,
    WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModal } from "@/components/Modal";
import { endpoint } from "@/components/constants";

interface WalletProviderProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the User context with a default value
const WalletContext = createContext<WalletProviderProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const network = WalletAdapterNetwork.Devnet;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

    // Define supported wallets
    const wallets = useMemo(
        () => [
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new PhantomWalletAdapter(),
        ],
        [network]
    );

    return (
        <WalletContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            <ConnectionProvider endpoint={endpoint}>
                <SolanaWalletProvider wallets={wallets} autoConnect>
                    {children}
                    <WalletModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                </SolanaWalletProvider>
            </ConnectionProvider>
        </WalletContext.Provider>
    );
};

// Create a custom hook for consuming the context
export const useWalletProvider = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWalletProvider must be used within a WalletProvider");
    }
    return context;
};
