import { useEffect, useState } from "react";
import { Icon } from "@iconify-icon/react";
import DuringDropdown from "../Dropdown/DuringDropdown";
import { useUserProvider } from "@/contexts/UserContext";
import ChartComponent from "../charts/ohlc";
import { fetchWithAuth } from "@/utils/setAuthToken";
import { formatCompactNumber } from "@/utils/utils";

const duringList: string[] = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
]

const ProfileModal = () => {
    const [date, setDate] = useState<string>(duringList[1])
    const [ohlc, setohlc] = useState([])
    const [netProfit, setNetProfit] = useState<number>(0);
    const [totalWaggers, setTotalWaggers] = useState<number>(0);
    const [luckiestWin, setLuckiestWin] = useState<number>(0);
    const [biggestWin, setBiggestWin] = useState<number>(0);

    const { isProfileModal, selectedUser, setIsProfileModal } = useUserProvider();

    const handleSetData = (data: string) => {
        setDate(data);
    }

    const getHistoryData = async (user: IProfileModal, date: string) => {
        const res = await fetchWithAuth(`/api/game/ohlc`, {
            method: 'POST',
            body: JSON.stringify({ id: user._id, date })
        })
        console.log("🚀 ~ getUser ~ res:", res)
        if (res) {
            setohlc(res.ohlcData);
            setNetProfit(res.reward - res.deposit);
            setTotalWaggers(res.deposit);
            setLuckiestWin(res.luckiestWin);
            setBiggestWin(res.biggestWin);
        }
    }

    useEffect(() => {
        if (selectedUser) {
            const fetchData = async () => {
                await getHistoryData(selectedUser, date);
            };
            fetchData();
        }
    }, [date, selectedUser])

    return (
        <div id="global-modal" className={`font-inter ${isProfileModal ? "block" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#0c122c]/75 z-[1000] transition-opacity duration-300 opacity-100" onClick={() => setIsProfileModal(false)}></div>
            <div className="w-full sm:w-max max-w-[calc(100%-32px)] sm:max-w-full h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative w-full h-full rounded-2xl bg-main border border-border">
                    <div className="p-8 w-full md:w-[787px] h-[calc(100vh-275px)] sm:h-[650px] md:h-[800px] lg:h-auto overflow-y-scroll relative">
                        <div className="absolute top-0 right-0 cursor-pointer bg-[#222]/75 p-3 rounded-bl-xl block sm:hidden" onClick={() => setIsProfileModal(false)}>
                            <Icon icon="mingcute:close-line" width="24" height="24" style={{ color: "#373d3f" }} />
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 pb-5 mb-4 border-b border-border">
                            <div className="flex items-center gap-4">
                                <div className="flex rounded-[6px] transition-[filter] duration-300 cursor-pointer w-16 h-16 shrink-0 bg-layer2 p-[2px] border-none">
                                    <div className="flex w-full h-full p-[1px] rounded-[6px] border border-light-grey bg-layer2">
                                        <div className="w-full h-full rounded-[6px]">
                                            <img src={selectedUser && selectedUser.avatar ? selectedUser.avatar : undefined} className="object-cover object-center rounded-[6px] w-full h-full" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-xl text-white max-w-[200px] truncate">{selectedUser && selectedUser.username}</h4>
                                        <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                            <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">11</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex ml-auto mb-auto gap-2 w-full md:w-auto">
                                <button className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 w-full hover:bg-[#393939]/75 text-sm rounded-lg bg-layer2 h-[36px] border-transparent text-light-grey font-semibold cursor-pointer">
                                    Joined
                                    <span className="font-semibold text-white ml-1">{selectedUser && new Date(selectedUser.created_at).toISOString().split('T')[0]}</span>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="font-medium text-white text-sm mb-2.5">Statistics</p>
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
                                    <DuringDropdown duringList={duringList} duringTime={date} setDuringTime={handleSetData} />
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-between gap-2 w-full h-[315px] mb-4 border-b border-border relative`}>
                            <div className="flex w-full h-full rounded-lg">
                                {ohlc?.length
                                    ? <ChartComponent data={ohlc} />
                                    : <div className="flex items-center justify-center w-full h-full bg-layer2 rounded-lg border z-[200000] border-border opacity-40">
                                        Waiting <Icon icon="eos-icons:three-dots-loading" width="24" height="24" style={{ color: "#fff" }} />
                                    </div>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <p className="font-medium text-white text-sm">Statistics</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                                <div className="flex w-full h-[96px] bg-gradient-border-btn rounded-lg p-[1px]">
                                    <div className="flex w-full h-full p-3 items-center justify-center gap-2 rounded-lg bg-gradient-lucky-bg">
                                        <img src="/images/lucky.png" className="object-cover object-center w-12 h-12 aspect-square flex-none" alt=""></img>
                                        <div className="flex flex-col justify-center w-full h-full gap-1">
                                            <p className="text-sm font-medium text-light-grey">Luckiest Win</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <img src="/images/rocket.png" className="object-cover object-center w-5 h-5 aspect-square flex-none" alt=""></img>
                                                <p className="font-bold text-white">{luckiestWin ? formatCompactNumber(luckiestWin) : 0}x</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full h-[96px] bg-gradient-border-btn rounded-lg p-[1px]">
                                    <div className="flex w-full h-full p-3 items-center justify-center gap-2 rounded-lg bg-gradient-biggest-bg">
                                        <img src="/images/biggest.png" className="object-cover object-center w-12 h-12 aspect-square flex-none" alt=""></img>
                                        <div className="flex flex-col justify-center w-full h-full gap-1">
                                            <p className="text-sm font-medium text-light-grey">Biggest Win</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="w-6 h-6 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="16" height="16" />
                                                </div>
                                                <p className="font-bold text-white">{biggestWin ? formatCompactNumber(biggestWin) : 0}x</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full h-[96px] bg-gradient-border-btn rounded-lg p-[1px]">
                                    <div className="flex w-full h-full p-3 items-center justify-center gap-2 rounded-lg bg-gradient-wager-bg">
                                        <img src="/images/3d-sol.png" className="object-cover object-center w-12 h-12 aspect-square flex-none" alt=""></img>
                                        <div className="flex flex-col justify-center w-full h-full gap-1">
                                            <p className="text-sm font-medium text-light-grey">Total Wagered</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="w-6 h-6 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="16" height="16" />
                                                </div>
                                                <p className="font-bold text-white">{totalWaggers ? formatCompactNumber(totalWaggers) : 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal
