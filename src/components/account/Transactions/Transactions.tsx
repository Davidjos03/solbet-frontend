import React, { useEffect, useRef, useState } from 'react'
import { Icon } from "@iconify-icon/react";
import { formatTransactionDate } from '@/utils/utils'

const Transactions: React.FC<{
    transaction: IHistory;
}> = ({
    transaction,
}) => {
        const [open, setOpen] = useState<boolean>(false);

        const openRef = useRef<HTMLDivElement>(null);

        const handleLink = (sig: string) => {
            // For Base mainnet transactions
            const url = `https://solscan.io/tx/${sig}?cluster=devnet`;
            window.open(url, '_blank'); // Opens in new tab
        };

        // Close dropdown when clicking outside
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    openRef.current &&
                    !openRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
            <div className="flex flex-col last:border-none border-b border-[#9999997a] rounded-md" ref={openRef}>
                <div
                    className={`flex items-center gap-2 py-3 ${open ? "border-b border-[#9999997a]" : ""} cursor-pointer`}
                    onClick={() => setOpen(!open)}
                >
                    <div className="text-sm text-[#A2A2A2] w-[18%] truncate">{transaction._id}</div>
                    <div className="flex items-center gap-2 text-sm text-[#A2A2A2] font-semibold w-[20%]">
                        <img src="/images/solana.png" alt="" className="w-4 h-4"></img> {transaction.price.toFixed(3)}
                    </div>
                    <div className="text-sm text-[#A2A2A2] w-[15%]">{transaction.type}</div>
                    <div className="text-sm text-[#A2A2A2] w-[12%]">{transaction.status}</div>
                    <div className="text-sm text-[#A2A2A2] w-[35%] text-end flex-none">
                        {formatTransactionDate(transaction.create_at)}
                    </div>
                </div>
                {
                    open &&
                    <div
                        className="flex items-center gap-3 py-2 px-4 cursor-pointer"
                        onClick={() => handleLink(transaction.sig)}
                    >
                        <p className="text-sm text-[#A2A2A2]">Jackpot</p>
                        <Icon icon="akar-icons:link-out" width="16" height="16" style={{ color: "#fff" }} />
                    </div>
                }
            </div>
        )
    }

export default Transactions
