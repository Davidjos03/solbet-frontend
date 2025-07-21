import { useEffect, useState } from "react";
import { useUserProvider } from "@/contexts/UserContext";
import { fetchWithAuth } from "@/utils/setAuthToken";
import { Icon } from "@iconify-icon/react";
import { formatCompactNumber } from "@/utils/utils";

const StatisticsPage = () => {
    const [netProfit, setNetProfit] = useState<number>(0);
    const [totalWaggers, setTotalWaggers] = useState<number>(0);
    const [luckiestWin, setLuckiestWin] = useState<number>(0);
    const [biggestWin, setBiggestWin] = useState<number>(0);

    const { userInfo } = useUserProvider();

    const getHistoryData = async (user: IProfileModal, date: string) => {
        const res = await fetchWithAuth(`/api/game/ohlc`, {
            method: 'POST',
            body: JSON.stringify({ id: user._id, date })
        })
        console.log("🚀 ~ getUser ~ res:", res)
        if (res) {
            setNetProfit(res.tReward - res.tDeposit);
            setTotalWaggers(res.tDeposit);
            setLuckiestWin(res.luckiestWin);
            setBiggestWin(res.biggestWin);
        }
    }

    useEffect(() => {
        if (userInfo) {
            const fetchData = async () => {
                await getHistoryData(userInfo, "All Time");
            };
            fetchData();
        }
    }, [])

    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <p className="font-semibold text-white text-sm mb-2.5">Statistics</p>
            <div className="w-full bg-gradient-border-btn p-[1px] rounded-xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-layer w-full h-full rounded-[10px] p-3 gap-3 relative">
                    <div className="flex flex-col gap-1 items-center justify-start">
                        <p className="text-sm text-light-grey font-medium mb-1">You/ve earned</p>
                        <div className="flex items-center gap-1.5">
                            <Icon icon={netProfit > 0 ? "tabler:plus" : "tabler:minus"} width="24" height="24" style={{ color: `${netProfit > 0 ? "#09A0FC" : "#ff4d4f"}` }} />
                            <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                <Icon icon="token-branded:solana" width="24" height="24" />
                            </div>
                            <h4 className="font-bold text-[24px] text-white">{netProfit ? Math.abs(netProfit).toFixed(4) : "0.0000"}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 pt-4">
                <h4 className="text-sm text-white">Wager Stats</h4>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    <div className="w-full bg-layer border border-border rounded-xl p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Total Wagered</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                </div>
                                <h4 className="text-base text-white font-bold">{totalWaggers ? totalWaggers.toFixed(2) : 0}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-layer border border-border rounded-xl p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Profit</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                </div>
                                <h4 className="text-base text-white font-bold">{netProfit ? netProfit.toFixed(4) : 0}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-layer border border-border rounded-xl p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Luckiest Win</p>
                            <div className="flex items-center gap-2">
                                <h4 className="text-base text-white font-bold">{luckiestWin ? formatCompactNumber(luckiestWin) : 0}%</h4>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-layer border border-border rounded-xl p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Biggest Win</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                </div>
                                <h4 className="text-base text-white font-bold">{biggestWin ? formatCompactNumber(biggestWin) : 0}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;