import SmoothCardCarousel from "@/components/GameBoard/SmoothCardCarousel";
import UserCard from "@/components/GameBoard/UserCard";
import { connection } from "@/constants/envConstants";
import { useUserProvider } from "@/contexts/UserContext";
import { joinGame } from "@/contract/solbet";
import { useGameSocket } from "@/hooks/useGameSocket";
import { EGameEvent } from "@/types/socket";
import { Icon } from "@iconify-icon/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";

const Jackpot = () => {
    const [value, setValue] = useState<string>("");
    const [remainingTime, setRemainingTime] = useState<number>(60);

    const { userInfo, round, isDuration, totalAmount, players, setPlayers, setTotalAmount, setIsDuration, setRound } = useUserProvider();
    const { publicKey, sendTransaction } = useWallet();
    const { gameSocket } = useGameSocket();

    const handleDeposit = async () => {
        console.log("🚀 ~ handleDeposit ~ round:", round)
        try {
            if (publicKey && value != "") {
                const depositIx = await joinGame(publicKey, round, Number(value))
                console.log("🚀 ~ handleDeposit ~ depositIx:", depositIx)

                if (depositIx) {
                    const transaction = new Transaction().add(
                        depositIx
                    )

                    // Get recent blockhash
                    const { blockhash } = await connection.getRecentBlockhash();
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = publicKey;

                    console.log(await connection.simulateTransaction(transaction))

                    // Send transaction and await for signature
                    const signature = await sendTransaction(transaction, connection);
                    console.log("🚀 ~ handleDeposit ~ signature:", signature)

                    const historyData: IHistory = {
                        sig: "signature",
                        price: Number(value),
                        type: "deposite",
                        status: "success",
                        create_at: new Date(),
                        round: round + 1,
                        user_id: userInfo!._id
                    }

                    gameSocket?.emit(EGameEvent.SAVE_HISTORY, historyData)

                } else {
                    console.log("Deposit failed.")
                }
            }
        } catch (err) {
            console.log("Deposit failed.", err)
        }
    }

    // Format seconds into MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!gameSocket) return

        gameSocket.on(EGameEvent.UPDATE_ROUND, (data: number) => {
            setRound(data);
        })

        gameSocket.on(EGameEvent.DURATION_STATE, (data: boolean) => {
            setIsDuration(data);
        })

        gameSocket.on(EGameEvent.UPDATE_TOTAL_AMOUNT, (data: { players: IPlayer[]; totalAmount: number }) => {
            console.log("🚀 ~ gameSocket.on ~ data:", data)
            setTotalAmount(data.totalAmount);
            setPlayers(prev => {
                // Create a new array that:
                // 1. Takes the incoming players (up to the length of prev array)
                // 2. Fills the rest with the remaining players from prev array
                return [
                    ...data.players.slice(0, prev.length), // Take new players (up to original length)
                    ...prev.slice(data.players.length)     // Fill remainder with existing players
                ];
            });
        })
    }, [gameSocket])

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isDuration && remainingTime > 0) {
            intervalId = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        setIsDuration(false); // Set isDuration to false when time reaches 0
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isDuration, remainingTime]);

    return (
        <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28">
            <div className="opacity-100 translate-y-2 animate-fade-y">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 max-w-[1440px] desktop:max-w-[1800px] mx-auto">
                    <div className="max-w-full lg:max-w-[calc(100%-250px)] custom-1:max-w-[880px] desktop:max-w-[1200px] mx-auto w-full">
                        <div className="flex flex-col gap-6 md:gap-7">
                            <div className="flex sm:items-center justify-between w-full gap-4">
                                <div className="flex sm:items-center gap-4 sm:gap-1 grow">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-2.5">
                                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#2c5fbf" }} />
                                            <h2 className="font-airstrike text-[28px] 2xl:text-[32px] leading-[28px] my-0 text-white">Jackpot</h2>
                                        </div>
                                        <h4 className="text-[#BFBFCD] text-xs 2xl:text-sm font-medium whitespace-nowrap">Winner takes all...</h4>
                                    </div>
                                    <img src="/images/static/halftone.e9491561.webp" className="object-cover object-center w-[109px] aspect-[109/79] hidden sm:block" alt=""></img>
                                </div>
                                <div className="flex flex-col-reverse sm:flex-row items-end ml-auto shrink gap-2 sm:gap-0.5 md:gap-1 mt-auto">
                                    <div className="w-full md:w-auto mr-auto">
                                        <div className="flex gap-1 md:gap-1.5 h-[44px] w-full sm:w-auto">
                                            <div className="relative w-max block">
                                                <div className="w-full relative">
                                                    <p className="mb-2 text-[#A2A2A2] text-xs font-book absolute -top-[24px] gap-1 flex">Bet Amount
                                                        <span className="text-white">~$0</span>
                                                    </p>
                                                    <div className="relative w-full">
                                                        <div className="absolute inset-y-0 my-auto left-2.5 h-max w-max">
                                                            <img src="/images/solana.png" className="object-cover object-center w-6 h-6 rounded-full" alt=""></img>
                                                        </div>
                                                        <input
                                                            className="border-[1px] transition-colors duration-300 px-3 h-[44px] rounded-lg text-sm focus:outline-none focus:border-[#3c3c3c] pl-11 bg-[#162135] border-[#292929] w-[120px] sm:w-full lg:w-[220px] desktop:w-[260px] hide-input-arrows"
                                                            placeholder="0.00"
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value)}
                                                        >
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="bg-gradient-to-t from-[#161629] to-[#181836] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer hidden xs:block xs:ml-1">
                                                <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#454545] to-[#232323] border-[1px] border-[#1D1D1D]">
                                                    <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 bg-[#2e2e42] hover:bg-[#343449]/75 text-sm font-medium rounded-lg h-full w-[48px] text-[#C4C4C4] cursor-pointer [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">+0.1</div>
                                                </div>
                                            </button>
                                            <button className="bg-gradient-to-t from-[#161629] to-[#181836] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer hidden min-[1440px]:block">
                                                <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#454545] to-[#232323] border-[1px] border-[#1D1D1D]">
                                                    <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-4 bg-[#2e2e42] hover:bg-[#343449]/75 text-sm font-medium rounded-lg h-full w-[48px] text-[#C4C4C4] cursor-pointer [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">+1</div>
                                                </div>
                                            </button>
                                            <button
                                                className="bg-gradient-to-t from-[#192130] to-[#162231] p-[3px] rounded-2xl transition-opacity duration-300 opacity-100 w-fit sm:w-full cursor-pointer"
                                                disabled={userInfo ? false : true}
                                                // onClick={() => console.log("object")}
                                                onClick={() => handleDeposit()}
                                            >
                                                <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#6797df] to-[#2a64cf] border-[1px] border-[#1D1D1D]">
                                                    <div className="group flex items-center justify-center relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#2c5fbf] hover:bg-[#2c5fbf]/75 text-sm font-bold text-white h-[32px] whitespace-nowrap font-book opacity-100 [text-shadow: rgba(0, 0, 0, 0.5) 0px 2px]">
                                                        <span className="hidden sm:inline mr-1">Place</span> Bet
                                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(68.53%_169.15%_at_50%_-27.56%,_#D787FF_0%,_#5B2CBF_100%)] transition-opacity duration-500 z-[1] opacity-0 group-hover:opacity-20 mix-blend-screen"></div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 2xl:gap-4 justify-between w-full -mt-1.5">
                                <div className="transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative w-full border-[#34527e] bg-[#0D0D0D]">
                                    <div className="absolute w-[calc(100%+5px)] h-[calc(100%+4px)] inset-y-0 my-auto border-[2px] border-[#292a64] top-0 -left-[3px] rounded-[14px]"></div>
                                    <div className="p-[1px] h-full rounded-lg relative border overflow-hidden bg-conic-progress">
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-[#1D1D1D] rounded-[7px] relative z-[3] overflow-hidden">
                                            <div className="bg-gradient-to-l from-[#2c5fbf]/35 to-[#2c5fbf]/0 w-full h-full absolute"></div>
                                            <img src="/images/dot-pattern-stat.webp" className="object-cover object-center absolute top-0 left-0 w-full h-full" alt=""></img>
                                            <div className="flex items-center gap-1.5">
                                                <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                                <div className="my-0 font-bold text-xl text-white"><span>{totalAmount}</span></div>
                                            </div>
                                            <p className="text-sm text-[#A2A2A2] font-medium">Jackpot Value</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                    <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-[#2c5fbf]/10 rounded-[7px] relative z-[3] overflow-hidden">
                                            <div className="flex items-center gap-1.5">
                                                <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                                <div className="my-0 font-bold text-xl text-white"><span>0.000</span></div>
                                            </div>
                                            <p className="text-sm text-[#A2A2A2] font-medium">Your Wager</p>
                                        </div>
                                        <div id="progress" className="w-[calc(100%-2px)] h-[calc(100%-2px)] absolute bg-[#303030] top-[1px] right-[1px] rounded-[7px]"></div>
                                    </div>
                                </div>
                                <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                    <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-[#2c5fbf]/10 rounded-[7px] relative z-[3] overflow-hidden">
                                            <div className="flex items-center gap-1.5">
                                                <div className="my-0 font-bold text-xl text-white"><span>0.00</span>%</div>
                                            </div>
                                            <p className="text-sm text-[#A2A2A2] font-medium">Your Chance</p>
                                        </div>
                                        <div id="progress" className="w-[calc(100%-2px)] h-[calc(100%-2px)] absolute bg-[#303030] top-[1px] right-[1px] rounded-[7px]"></div>
                                    </div>
                                </div>
                                <div className="w-full bg-transparent transition-colors duration-300 p-[4px] rounded-xl h-[97px] relative">
                                    <div className="p-[1px] h-full rounded-lg relative overflow-hidden">
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-[#2c5fbf]/10 rounded-[7px] relative z-[3] overflow-hidden">
                                            <div className="flex items-center gap-1.5">
                                                <h1 className="my-0 font-bold text-xl">
                                                    <div className="flex overflow-hidden tabular-nums">
                                                        <div className="opacity-100">
                                                            <div>
                                                                <div id="0" className="relative inline-flex items-center justify-center gap-1 animate-timer-digit w-[95px]">
                                                                    {formatTime(remainingTime)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </h1>
                                            </div>
                                            <p className="text-sm text-[#A2A2A2] font-medium">Time Remaining</p>
                                        </div>
                                        <div id="progress" className="w-[calc(100%-2px)] h-[calc(100%-2px)] absolute bg-[#303030] top-[1px] right-[1px] rounded-[7px]"></div>
                                    </div>
                                </div>
                            </div>
                            <SmoothCardCarousel cards={players} />
                            {/* <Bonus /> */}
                            <div className="w-full min-h-[600px] border-t border-[#22222D]/50">
                                <div className="flex md:hidden justify-center mt-4 items-center gap-1.5 pl-2 pr-3 py-2 rounded-lg bg-[#0f2030]/40">
                                    <img src="/images/solana.png" className="object-cover object-center w-5 h-5" alt=""></img>
                                    <p className="text-[#307bc0] font-medium text-sm">Payouts are settled in SOL</p>
                                </div>
                                <div className="flex justify-between pt-5 text-[#A2A2A2] text-sm font-book mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: "#2c5fbf" }} />
                                            <p>2 Players</p>
                                        </div>
                                        <div className="h-2/3 w-[1px] bg-[#303030]/50 hidden md:block"></div>
                                        <div className="hidden md:flex items-center gap-1.5 pl-2 pr-3 py-[5px] rounded-lg bg-[#1b3146]/40">
                                            <img src="/images/solana.png" className="object-cover object-center w-4 h-4" alt=""></img>
                                            <p className="text-[#2d6da8] font-medium text-[13px]">Payouts are settled in SOL</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[16px] text-[#2c5fbf]">#</p>
                                        <p className="text-[#E3E3E3]">Round: <strong className="text-white font-bold">{round + 1}</strong></p>
                                    </div>
                                </div>
                                <div className="min-h-[92px]">
                                    <UserCard />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-col gap-6 lg:max-w-[180px] 2xl:max-w-[225px] ml-auto w-full flex-wrap md:flex-nowrap shrink-0">
                        <div className="flex flex-col xs:flex-row lg:flex-col gap-6 w-full zoom-80 2xl:zoom-100">
                            <div className="relative h-max lg:h-[280px] w-full" style={{ animationDelay: "0s" }}>
                                <div>
                                    <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                        <div className="w-full bg-gradient-to-t from-[#0c1e2b]/15 to-[#00293b]/50 rounded-[14px] p-[3px]">
                                            <div className="flex flex-col shadow-bet h-full rounded-[11px]">
                                                <div className="w-full rounded-t-[11px] bg-gradient-to-b from-[#122033] to-[#262f44] p-[3px] pb-0 grow relative">
                                                    <div className="w-full h-full bg-gradient-to-b from-[#181a1f] to-[150%] to-[#334357] rounded-t-[8px] p-4">
                                                        <img src="/images/download.webp" className="object-cover object-center w-full absolute top-0 left-0" alt=""></img>
                                                        <div className="relative z-[3]">
                                                            <div className="flex justify-between uppercase text-xs text-[#8C8C8C] mb-3">
                                                                <p>Round</p>
                                                                <p>#57534</p>
                                                            </div>
                                                        </div>
                                                        <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                                                            <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                                                                <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                                    <img src="/images/avatar.svg" className="object-cover object-center w-full h-full" alt=""></img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                                                            <p className="text-sm font-semibold max-w-[75px] truncate text-white">Tommy9081</p>
                                                            <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                                <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">10</div>
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <span className="text-[11px] italic absolute inset-0 m-auto w-max h-max uppercase text-white">Last Winner</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[1px] bg-[#2c3342]"></div>
                                                <div className="w-full bg-gradient-to-b from-[#242d3b] to-[#040a24] shrink-0 rounded-b-[11px] relative py-3 px-4">
                                                    <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full absolute top-0 left-0" alt=""></img>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center w-full justify-between relative z-[3]">
                                                            <p className="text-xs text-[#C4C4C4]">Won</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                <p className="text-sm font-semibold text-white">0.275</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between relative z-[3]">
                                                            <p className="text-xs text-[#C4C4C4]">Chance</p>
                                                            <p className="text-sm font-semibold text-white">27.62%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-max lg:h-[280px] w-full" style={{ animationDelay: "0s" }}>
                                <div>
                                    <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                        <div className="w-full bg-gradient-to-t from-[#0c1e2b]/15 to-[#00293b]/50 rounded-[14px] p-[3px]">
                                            <div className="flex flex-col shadow-bet h-full rounded-[11px]">
                                                <div className="w-full rounded-t-[11px] bg-gradient-to-b from-[#122033] to-[#262f44] p-[3px] pb-0 grow relative">
                                                    <div className="w-full h-full bg-gradient-to-b from-[#25272e] to-[150%] to-[#303847] rounded-t-[8px] p-4">
                                                        <img src="/images/download.webp" className="object-cover object-center w-full absolute top-0 left-0" alt=""></img>
                                                        <div className="relative z-[3]">
                                                            <div className="flex justify-between uppercase text-xs text-[#8C8C8C] mb-3">
                                                                <p>Round</p>
                                                                <p>#57534</p>
                                                            </div>
                                                        </div>
                                                        <div className="rounded-[18px] overflow-hidden border-[1px] border-[#222222] aspect-square hover:brightness-125 transition-[filter] duration-300 cursor-pointer w-[72px] h-[72px] mx-auto bg-[#303045] p-[1px] border-none">
                                                            <div className="w-full h-full p-0.5 border-[1px] border-[#222222] rounded-[18px] bg-gradient-to-b from-[#8A8A8A] to-[#5A5A5A]">
                                                                <div className="w-full h-full border-[1px] border-[#222222] rounded-[18px] overflow-hidden bg-black/75 shadow-avatar-emboss relative">
                                                                    <img src="/images/avatar.svg" className="object-cover object-center w-full h-full" alt=""></img>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-3 mx-auto w-max mb-3">
                                                            <p className="text-sm font-semibold max-w-[75px] truncate text-white">Tommy9081</p>
                                                            <div className="p-[1px] rounded-md overflow-hidden bg-[#307293] text-[#75D1FF]">
                                                                <div className="flex items-center justify-center rounded-[5px] overflow-hidden bg-[#22222D]/80 font-semibold w-[28px] h-5 text-[11px]">10</div>
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <span className="text-[11px] italic absolute inset-0 m-auto w-max h-max uppercase text-white">Last Winner</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[1px] bg-[#2c3342]"></div>
                                                <div className="w-full bg-gradient-to-b from-[#242d3b] to-[#040a24] shrink-0 rounded-b-[11px] relative py-3 px-4">
                                                    <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full absolute top-0 left-0" alt=""></img>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center w-full justify-between relative z-[3]">
                                                            <p className="text-xs text-[#C4C4C4]">Won</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                <p className="text-sm font-semibold text-white">0.275</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between relative z-[3]">
                                                            <p className="text-xs text-[#C4C4C4]">Chance</p>
                                                            <p className="text-sm font-semibold text-white">27.62%</p>
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
                </div>
            </div>
        </div>
    )
}

export default Jackpot
