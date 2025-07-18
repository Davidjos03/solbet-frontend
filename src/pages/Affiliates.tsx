import { useEffect, useState } from "react";
import DuringDropdown from "@/components/Dropdown/DuringDropdown";
import { Icon } from "@iconify-icon/react";
import cn from "classnames";
import { useGameSocket } from "@/hooks/useGameSocket";
import { useUserProvider } from "@/contexts/UserContext";
import { EGameEvent } from "@/types/socket";
import ChartComponent from "@/components/charts/ohlc";
import { fetchWithAuth } from "@/utils/setAuthToken";
import { useWallet } from "@solana/wallet-adapter-react";
import Input from "@/components/Input";
import { useWalletProvider } from "@/contexts/WalletContext";

const duringList: string[] = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
]

const Affiliates = () => {
    const user = localStorage.getItem('userInfo');
    const userInfo: IUser | null = user ? JSON.parse(user) : null;

    const [inviteLink, setInviteLink] = useState<string>(userInfo ? userInfo.invite_link : "");
    const [date, setDate] = useState<string>(duringList[1]);
    const [ohlc, setohlc] = useState([]);
    const [users, setUsers] = useState<number>(0);
    const [totalEarned, setTotalEarned] = useState<number>(0);

    const { setTotalBetAmount, setSolPrice, setUserInfo } = useUserProvider();
    const { connected } = useWallet()
    const { gameSocket } = useGameSocket();
    const { setIsModalOpen } = useWalletProvider();

    const handleSetData = (data: string) => {
        setDate(data);
    }

    const handleUpdateUser = async (data: string, type: string) => {
        const updateData = {
            id: userInfo!._id,
            [type]: data
        }
        const res = await fetchWithAuth(`/api/auth/update`, {
            method: 'POST',
            body: JSON.stringify(updateData)
        })
        if (res) {
            console.log("🚀 ~ getUser ~ res:", res);
            setUserInfo(res)
            localStorage.setItem('userInfo', JSON.stringify(res));
        } else {
            console.log('Failed to update user info');
        }
    }

    const getHistoryData = async (user: IUser, date: string) => {
        const res = await fetchWithAuth(`/api/referral/`, {
            method: 'POST',
            body: JSON.stringify({ id: user._id, date })
        })
        console.log("🚀 ~ getUser ~ res:", res)
        if (res) {
            setohlc(res.ohlcData);
            setUsers(res.users);
            setTotalEarned(res.totalEarned);
        }
    }

    useEffect(() => {
        if (userInfo) {
            const fetchData = async () => {
                await getHistoryData(userInfo, date);
            };
            fetchData();
            // setInviteLink(userInfo.invite_link);
        }
    }, [date])

    useEffect(() => {
        if (!gameSocket) return;

        gameSocket.on(EGameEvent.SOL_PRICE, (solvalue: number) => {
            setSolPrice(solvalue)
        })

        gameSocket.on(EGameEvent.UPDATE_TOTAL_AMOUNT, (data: { players: IPlayer[]; totalBetAmount: number; totalAmount: number }) => {
            setTotalBetAmount(data.totalAmount);
            localStorage.setItem('totalAmount', JSON.stringify(data.totalAmount));
        })
    }, [gameSocket])

    return (
        <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28 font-inter">
            <div className="opacity-100 translate-y-2 animate-fade-y">
                <div className="max-w-[1064px] mx-auto">
                    <div>
                        <h1 className="font-racing text-[40px] text-white m-0">Affiliates</h1>
                        <p className="text-light-grey font-medium mb-8">Share your referral link with friends and get paid for each bet placed! The more you share, the more you earn!</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-[340px] shrink-0">
                            {userInfo && connected
                                ? <div className="flex flex-col bg-layer h-fit w-full rounded-xl">
                                    <div className="flex w-full items-center justify-between p-3 rounded-t-xl gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex rounded-[6px] transition-[filter] duration-300 cursor-pointer w-8 h-8 shrink-0 bg-layer2 p-[2px] border-none">
                                                <div className="flex w-full h-full p-[1px] rounded-[6px] border border-light-grey bg-layer2">
                                                    <div className="w-full h-full rounded-[6px]">
                                                        <img src={userInfo.avatar} className="object-cover object-center rounded-[6px] w-full h-full" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-xl text-white max-w-[200px] truncate">{userInfo.username}</h4>
                                                    <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                        <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">1</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex w-fit border border-[#05C681] bg-[#204E2D] shadow-medium px-2 py-1 rounded-lg">
                                            <p className="font-inter text-[#19FB9B] text-sm">3% Profit Share</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center w-full p-3 rounded-b-xl border border-border bg-main">
                                        <Input label="Your Referral Code" edit={true} state={inviteLink} setState={setInviteLink} onSave={() => handleUpdateUser(inviteLink, "invite_link")} />
                                    </div>
                                </div>
                                : <div className="relative flex items-center justify-center bg-layer h-[219px] rounded-xl">
                                    <div className="bg-secondary w-16 h-16 rounded-full absolute inset-0 m-auto blur-2xl z-[3]"></div>
                                    <button
                                        className={cn("p-[2px] rounded-lg w-fit h-10 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                            <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter font-bold text-white drop-shadow-small flex items-center justify-center gap-1.5 ml-auto cursor-pointer">
                                                <Icon icon="ion:wallet" width="16" height="16" style={{ color: "#FFFFFF" }} /> connect
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            }
                            {/* <div className="w-full bg-layer2 rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-layer border border-border rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#57A4FF] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="mingcute:telegram-fill" width="16" height="16" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm font-semibold text-white tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 br-border hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full aspect-square bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[10/11]" style={{ animationDuration: "500ms" }} width="1000" height="1100"></canvas>
                                    </div>
                                </div>
                                <div className="bg-layer2">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#162135]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-layer2 rounded-lg overflow-hidden mt-6">
                                <div className="w-full p-4 bg-layer border border-border rounded-lg">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#EA2E32] w-6 h-6 flex items-center justify-center rounded-md">
                                                <Icon icon="gravity-ui:play-fill" width="14" height="14" style={{ color: "#fff" }} />
                                            </div>
                                            <p className="text-sm text-white font-semibold tracking-wide">Telegram Panels</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 br-border hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg cursor-pointer">1</button>
                                            <button className="group flex items-center justify-center relative overflow-hidden transition duration-300 hover:bg-[#27354F]/75 text-sm text-[#A2A2A2] font-semibold w-6 h-6 p-0 min-w-0 rounded-lg bg-transparent cursor-pointer">2</button>
                                        </div>
                                    </div>
                                    <div className="w-full bg-[#141414] mt-4 rounded-lg">
                                        <canvas className="w-full h-auto animate-fade-in aspect-[306/70]" style={{ animationDuration: "500ms" }} width="1280" height="294"></canvas>
                                    </div>
                                </div>
                                <div className="bg-layer2">
                                    <button className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 hover:bg-[#162135]/75 text-sm w-full border-none bg-transparent text-[#A2A2A2] font-semibold rounded-none cursor-pointer">
                                        <Icon icon="ic:round-download" width="24" height="24" style={{ color: "#A2A2A2" }} />
                                        <div className="flex items-center justify-center gap-1 ">Download</div>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <div className="flex flex-col gap-9 w-full grow">
                            <div>
                                <p className="text-white font-semibold mb-4">Statistics</p>
                                <div className="w-full bg-gradient-border-btn p-[1px] rounded-xl mx-auto">
                                    <div className="flex flex-col md:flex-row md:items-center bg-layer w-full h-full rounded-[10px] p-5 gap-3 relative">
                                        <div className="flex gap-1 items-center justify-between w-full h-full">
                                            <div className="flex flex-col">
                                                <p className="text-sm leading-[20px] text-[#A2A2A2] font-medium">You’ve earned</p>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-[#171721] rounded-full">
                                                        <Icon icon="token-branded:solana" width="20" height="20" />
                                                    </div>
                                                    <h4 className="font-extrabold text-[24px] text-white">0</h4>
                                                </div>
                                            </div>
                                            <button
                                                className={cn("p-[2px] rounded-lg w-fit h-10 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                            >
                                                <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                                    <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter font-bold text-white drop-shadow-small flex items-center justify-center gap-1.5 ml-auto cursor-pointer">
                                                        Claim Earnings
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-2.5 mt-4">
                                    <div className="group flex gap-3 items-center p-4 bg-layer border border-border h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#27354F]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.png" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                        </div>
                                        <div>
                                            <h4 className="text-base text-white font-bold">{users}</h4>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Users</p>
                                        </div>
                                    </div>
                                    <div className="group flex gap-3 items-center p-4 bg-layer border border-border h-[84px] w-full rounded-lg relative transition-colors duration-300 hover:bg-[#27354F]">
                                        <div className="h-full aspect-square flex-none relative transition-all duration-300 group-hover:scale-110 group-hover:brightness-125 transform-gpu perspective will-change-transform">
                                            <img src="/images/3d-sol.png" className="object-cover object-center absolute inset-0 m-auto w-[2em] z-10" alt=""></img>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 flex items-center justify-center bg-[#171721] rounded-full">
                                                    <Icon icon="token-branded:solana" width="12" height="12" />
                                                </div>
                                                <h4 className="text-base text-white font-bold">{totalEarned}</h4>
                                            </div>
                                            <p className="text-sm font-medium text-[#A2A2A2] mt-1">Total Earned</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-[461px]">
                                <div className="flex items-center justify-between w-full h-fit mb-4">
                                    <div className="flex w-full justify-between items-center">
                                        <p className="text-white font-semibold">Wager Stats</p>
                                        <DuringDropdown duringList={duringList} duringTime={date} setDuringTime={handleSetData} />
                                    </div>
                                </div>
                                <div className="w-full h-full bg-layer mb-0 rounded-lg">
                                    <div className="flex w-full h-full rounded-lg">
                                        {ohlc?.length
                                            ? <ChartComponent data={ohlc} />
                                            : <div className="flex items-center justify-center w-full h-full bg-layer2 rounded-lg border z-[200000] border-border opacity-40">
                                                Waiting <Icon icon="eos-icons:three-dots-loading" width="24" height="24" style={{ color: "#fff" }} />
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-col p-3 rounded-lg bg-layer">
                                <p className="text-white font-semibold mb-4">Top Depositors</p>
                                <div className="flex flex-col gap-3">
                                    <div className="flex px-4 text-sm text-light-grey w-full gap-2">
                                        <div className="w-[25%]">Name</div>
                                        <div className="w-[20%]">Wagered</div>
                                        <div className="w-[30%]">Commission</div>
                                        <div className="w-[25%]">First Seen</div>
                                        <div className="w-[25%] text-right">Last Seen</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Affiliates
