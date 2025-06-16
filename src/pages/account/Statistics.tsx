import ChartComponent from "@/components/charts/ohlc";
import { DuringDropdown } from "@/components/Dropdown";
import { Params, useTokenHistory } from "@/utils/utils";
import { Icon } from "@iconify-icon/react";

const initialParams: Params = {
    symbol: "Crypto.SOL/USD",
    resolution: "1",
    from: 1684137600,
    to: 1684141200,
};

const StatisticsPage = () => {
    const { data: ohlc } = useTokenHistory(initialParams);

    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <p className="font-medium text-white text-sm mb-2.5">Statistics</p>
            <div className="w-full bg-blurp-gradient p-[1px] rounded-xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-gradient-to-t from-[#1f252d] to-[#171c21] w-full h-full rounded-[11px] px-6 py-5 gap-3 relative">
                    <div>
                        <p className="text-sm text-[#A2A2A2] font-medium mb-1">Net Profit</p>
                        <div className="flex items-center gap-1.5">
                            <Icon icon="tabler:minus" width="24" height="24" style={{ color: "#ff4d4f" }} />
                            <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                <Icon icon="token-branded:solana" width="24" height="24" />
                            </div>
                            <h4 className="font-bold text-[24px] text-white">0.6913</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center my-6">
                <p className="text-white font-semibold">Wager Stats</p>
                <DuringDropdown />
            </div>
            <div className={`flex justify-between gap-2 w-full h-[315px] mb-4 border-b border-[#222222] relative`}>
                <div className="flex w-full rounded-lg bg-[#272c33">
                    {ohlc?.length && <ChartComponent data={ohlc} />}
                </div>
            </div>
            <div>
                <h4 className="mb-3 mt-4 text-sm text-[#A2A2A2]">Wager Stats</h4>
                <div className="flex gap-3">
                    <div className="w-full bg-[#1D1D1D] border-[1px] border-[#303030] rounded-xl p-4">
                        <div>
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Total Wagered</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                </div>
                                <h4 className="text-base text-white font-bold">0</h4>
                            </div>
                        </div>
                        <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute right-0 top-0 h-full w-full" alt="Pattern"></img>
                    </div>
                    <div className="w-full bg-[#1D1D1D] border-[1px] border-[#303030] rounded-xl p-4">
                        <div>
                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Profit</p>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                </div>
                                <h4 className="text-base text-white font-bold">0</h4>
                            </div>
                        </div>
                        <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute right-0 top-0 h-full w-full" alt="Pattern"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;