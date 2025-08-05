import { useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Icon } from "@iconify-icon/react";
import cn from "classnames";
// import CardCarousel3D from "@/components/GameBoard/CardCarousel3D";
import UserCard from "@/components/GameBoard/UserCard";
import { connection } from "@/constants/envConstants";
import { useUserProvider } from "@/contexts/UserContext";
import { joinGame } from "@/contract/solbet";
import { useGameSocket } from "@/hooks/useGameSocket";
import { EGameEvent } from "@/types/socket";
import { getBalance } from "@/utils/common";
import { fetchWithAuth } from "@/utils/setAuthToken";
import { formatCompactNumber, formatTime, initialArray } from "@/utils/utils";
// import CardSlider from "@/components/GameBoard/CardSlider3D";
import CardSpinner from "@/components/GameBoard/CardSpinner";

const Jackpot = () => {
    const [value, setValue] = useState<string>("");
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [betAmount, setBetAmount] = useState<number>(0);
    const [wager, setWager] = useState<number>(0);
    const [chance, setChance] = useState<number>(0);
    // const [isNewRound, setIsNewRound] = useState<boolean>(false);
    const [amountError, setAmountError] = useState<string>("");
    const [spinCards, setSpinCards] = useState<IPlayer[]>(initialArray);
    const [allowPlayerUpdates, setAllowPlayerUpdates] = useState<boolean>(true);

    const { userInfo, round, totalBetAmount, players, winner, latestWinner, luckyUser, winnerIndex, solPrice, setUserInfo, setSolPrice, setSolBalance, setWinnerIndex, setWinner, setLatestWinner, setLuckyUser, setPlayers, setTotalAmount, setTotalBetAmount, setRound } = useUserProvider();
    const { publicKey, sendTransaction } = useWallet();
    const { gameSocket } = useGameSocket();

    const handleDeposit = async () => {
        try {
            if (publicKey && value != "" && remainingTime !== 0 && userInfo) {
                let affiliateState = false;
                let referralAdd: PublicKey = publicKey;
                let depositIx;
                if (userInfo.referral) {
                    const res = await fetchWithAuth(`/api/referral/affiliate`, {
                        method: 'POST',
                        body: JSON.stringify({ referral: userInfo.referral })
                    })
                    console.log("🚀 ~ getUser ~ res:", res)
                    if (res.state) {
                        affiliateState = res.state;
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        referralAdd = new PublicKey(userInfo.referral.split("_")[0]);
                    }
                }

                if (affiliateState) {
                    depositIx = await joinGame(publicKey, referralAdd, round, Number(value))
                } else {
                    depositIx = await joinGame(publicKey, publicKey, round, Number(value))
                }

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

                    await connection.confirmTransaction(signature, "confirmed");
                    console.log("🚀 ~ handleDeposit ~ signature:", signature);

                    const historyData: IHistory = {
                        sig: signature,
                        price: Number(value),
                        type: "deposit",
                        status: "success",
                        create_at: new Date(),
                        round: round,
                        user_id: userInfo!._id
                    }

                    gameSocket?.emit(EGameEvent.SAVE_HISTORY, historyData)

                    if (!userInfo.deposit_state) {
                        const updateReffer = {
                            referral: userInfo.referral,
                            amount: 30,
                            count: 0
                        }
                        const refferRes = await fetchWithAuth(`/api/referral/update`, {
                            method: 'POST',
                            body: JSON.stringify(updateReffer)
                        })
                        if (refferRes.state) {
                            const updateData = {
                                id: userInfo!._id,
                                deposit_state: true
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
                        } else {
                            console.log('Failed to update referral info');
                        }
                    }

                    // setWager((prev) => prev + Number(value));
                    setDepositAmount(Number(value));
                    setValue("");
                    const balance = await getBalance(publicKey);
                    setSolBalance(balance);
                }
            } else {
                console.log("Deposit failed.")
            }
        } catch (err) {
            console.log("Deposit failed.", err)
        }
    }

    const handleValueChange = (input: string) => {
        // Allows:
        // - Single "0"
        // - Numbers without leading zeros (123)
        // - Floats (1.23, 0.25)
        // - Naked decimals (.5)
        // - Empty string
        if (
            input === "" ||
            input === "0" ||
            /^(?!0\d)([1-9]\d*|0?)(\.\d*)?$/.test(input)
        ) {
            setValue(input);
        }
    };

    // useEffect(() => {
    //     if (remainingTime < 59) {
    //         setIsNewRound(true);
    //     }
    // }, [remainingTime])

    useEffect(() => {
        setBetAmount(Number(value) * solPrice);
    }, [value, solPrice])

    useEffect(() => {
        if (!gameSocket) return;

        gameSocket.on(EGameEvent.UPDATE_ROUND, (data: number) => {
            console.log("🚀 ~ gameSocket.on ~ data:", data)
            setRound(data);
        })

        gameSocket.on(EGameEvent.WINNER, (winIndex: number) => {
            setWinnerIndex(winIndex);
            // setWinner(players[winIndex]);
        })

        gameSocket.on(EGameEvent.UPDATE_REMAIN_TIME, (time: number) => {
            setRemainingTime(time);
        })

        gameSocket.on(EGameEvent.WAGER, (wager: number) => {
            console.log("🚀 ~ gameSocket.on ~ wager:", wager)
            setWager(wager)
        })

        gameSocket.on(EGameEvent.SOL_PRICE, (solvalue: number) => {
            setSolPrice(solvalue)
        })

        gameSocket.on(EGameEvent.UPDATE_TOTAL_AMOUNT, (data: { players: IPlayer[]; totalBetAmount: number; totalAmount: number }) => {
            setTotalAmount(data.totalAmount);
            localStorage.setItem('totalAmount', JSON.stringify(data.totalAmount));
            setTotalBetAmount(data.totalBetAmount);
            setWager((prev) => prev + depositAmount);
            setDepositAmount(0);
            console.log("🚀 ~ Jackpot ~ data.players:", data.players)
            
            // Only update players array if we're allowed to (not in 4-second delay period)
            if (allowPlayerUpdates) {
                setSpinCards((prev) => {
                    return [
                        ...data.players, // Take new players (up to original length)
                        ...prev.slice(data.players.length),
                    ]
                });
                setPlayers(data.players);
            }
        })
    }, [gameSocket])

    useEffect(() => {
        if (Number(value) < 0.001 && Number(value) != 0) {
            setAmountError("You have to deposit at least 0.001 SOL!")
        } else {
            setAmountError("")
        }
    }, [value])

    // const manualSetWinnerIndex = () => {
    //     setWinner({
    //         _id: "23424",
    //         price: 200,
    //         user_id: {
    //             _id: "10001",
    //             avatar: "/images/avatar.png",
    //             username: "test",
    //             created_at: new Date()
    //         }
    //     });
    // }

    // const manualSetRemainingTime = () => {
    //     let time = 5
    //     const interval = setInterval(() => {
    //         if (time === 0)
    //             clearInterval(interval)
    //         setRemainingTime(time);
    //         console.log(">>>>>>>>>>>>>>>>>>>>>", time)
    //         time--
    //     }, 1000)
    // }
    // const manualSetWager = () => {
    //     setWager(10)
    // }

    // const manualBet = () => {
    //     setSpinCards((prev) => {
    //         console.log("🚀 ~ setSpinCards ~ prev:", prev)
    //         return [
    //             {
    //                 _id: "23424",
    //                 price: 200,
    //                 user_id: {
    //                     _id: "10001",
    //                     avatar: "/images/avatar.png",
    //                     username: "test",
    //                     created_at: new Date()
    //                 }

    //             }, // Take new players (up to original length)
    //             ...prev.slice(1),
    //         ]
    //     })
    //     setPlayers([{
    //         _id: "23424",
    //         price: 200,
    //         user_id: {
    //             _id: "10001",
    //             avatar: "/images/avatar.png",
    //             username: "test",
    //             created_at: new Date()
    //         }

    //     }])
    // }

    useEffect(() => {
        console.log('clear-------------')
        const fetchWinner = async () => {
            if (round > 1) {
                console.log("🚀 ~ fetchWinner ~ round:", round)
                const winner = await fetchWithAuth(`/api/round/winner/${round - 1}`, {
                    method: 'GET',
                })
                // console.log("🚀 ~ getUser ~ winner:", winner)
                setLatestWinner(winner);

                const lucky = await fetchWithAuth(`/api/round/luck`, {
                    method: 'GET',
                })
                // console.log("🚀 ~ getUser ~ lucky:", lucky)
                setLuckyUser(lucky);
            }
            if (!publicKey) return;
            const balance = await getBalance(publicKey);
            setSolBalance(balance);
        };
        fetchWinner();

        // setIsNewRound(false);
        setPlayers([]);
        setAllowPlayerUpdates(true); // Ensure player updates are allowed for new rounds
    }, [round, publicKey])

    useEffect(() => {
        if (winnerIndex != null) {
            setWinner(spinCards[winnerIndex])
        }
    }, [winnerIndex])

    useEffect(() => {
        if (remainingTime < 59 && winner) {
            // Disable player updates during the 4-second delay
            setAllowPlayerUpdates(false);
            
            // Add 4-second delay before refreshing game items
            const timer = setTimeout(() => {
                setSpinCards(initialArray);
                setWinner(null);
                setWinnerIndex(null);
                setTotalAmount(0);
                setRemainingTime(59);
                setAllowPlayerUpdates(true); // Re-enable player updates after 4 seconds
            }, 4000); // 4 seconds delay

            // Cleanup timer if component unmounts or dependencies change
            return () => clearTimeout(timer);
        }
    }, [remainingTime, winner])

    useEffect(() => {
        if (gameSocket && userInfo) {
            gameSocket.emit(EGameEvent.GET_WAGER, userInfo._id)
        }
        if (totalBetAmount) {
            setChance(wager / totalBetAmount * 100)
        } else {
            setChance(0);
        }
    }, [wager, totalBetAmount, gameSocket, userInfo])

    return (
        <div className="w-full min-h-[calc(100vh-110px)] h-full md:pt-10 pt-12 mb-60 mt-12 md:mt-16 lg:mt-28">
            <div className="opacity-100 px-6 lg:px-16 translate-y-2 animate-fade-y">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 max-w-[1440px] desktop:max-w-[1800px] mx-auto">
                    <div className="max-w-full lg:max-w-[calc(100%-250px)] custom-1:max-w-[880px] desktop:max-w-[1200px] mx-auto w-full">
                        <div className="relative flex flex-col gap-6 md:gap-7">
                            <div className="flex sm:items-center justify-between w-full gap-4">
                                <div className="flex sm:items-center gap-4 sm:gap-1 grow">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-2.5">
                                            <Icon icon="gravity-ui:target-dart" width="24" height="24" style={{ color: "#2c5fbf" }} />
                                            <h2 className="font-racing text-[28px] 2xl:text-[32px] leading-[28px] text-white">Jackpot</h2>
                                        </div>
                                        <h4 className="font-inter text-light-grey text-xs 2xl:text-sm whitespace-nowrap">Winner takes all...</h4>
                                    </div>
                                    <img src="/images/static/halftone.e9491561.webp" className="object-cover object-center w-[109px] aspect-[109/79] hidden sm:block" alt=""></img>
                                </div>
                                <div className="flex flex-col-reverse sm:flex-row items-end ml-auto shrink gap-2 sm:gap-0.5 md:gap-1 mt-auto">
                                    <div className="w-full md:w-auto mr-auto">
                                        <div className="flex gap-1 md:gap-1.5 h-9 w-full sm:w-auto">
                                            <div className="relative w-max block">
                                                <div className="w-full relative">
                                                    <p className="w-full mb-2 font-inter text-light-grey text-xs font-book absolute -top-[24px] gap-1 flex">
                                                        Bet amount<span className="text-white"> ~${formatCompactNumber(betAmount)}</span>
                                                    </p>
                                                    <div className="relative w-full">
                                                        <div className="absolute inset-y-0 my-auto left-2.5 h-max w-max">
                                                            <img src="/images/solana.png" className="object-cover object-center w-6 h-6 rounded-full" alt=""></img>
                                                        </div>
                                                        <input
                                                            className="border-[1px] transition-colors duration-300 px-2 py-[6px] gap-2 h-9 rounded-lg text-sm focus:outline-none focus:border-none pl-11 bg-layer border-border w-[120px] sm:w-full lg:w-[172px] desktop:w-[260px] hide-input-arrows"
                                                            placeholder="0.00"
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleValueChange(e.target.value)}
                                                            pattern="-?[0-9]*\.?[0-9]*"
                                                        >
                                                        </input>
                                                    </div>
                                                    {amountError && <p className="bt-[1px] font-inter text-[#bb3333] text-[9px] text-nowrap">{amountError}</p>}
                                                </div>
                                            </div>
                                            <button
                                                className="bg-layer2 p-[2px] w-fit h-9 rounded-lg transition-opacity duration-300 cursor-pointer hidden xs:block xs:ml-1"
                                                onClick={() => handleValueChange((Number(value) + 0.1).toFixed(3))}
                                            >
                                                <div className="p-[1px] rounded-lg w-full h-full relative bg-gradient-border-btn">
                                                    <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-2 py-[6px] bg-[#37445C] hover:bg-[#37445C]/75 font-inter drop-shadow-small text-sm font-medium rounded-lg h-full w-full text-light-grey cursor-pointer">+0.1</div>
                                                </div>
                                            </button>
                                            <button
                                                className="bg-layer2 p-[2px] w-fit h-9 rounded-lg transition-opacity duration-300 cursor-pointer hidden xs:block xs:ml-1"
                                                onClick={() => handleValueChange((Number(value) + 1).toFixed(3))}
                                            >
                                                <div className="p-[1px] rounded-lg w-full h-full relative bg-gradient-border-btn">
                                                    <div className="group flex items-center justify-center relative min-w-10 overflow-hidden transition duration-300 px-2 py-[6px] bg-[#37445C] hover:bg-[#37445C]/75 font-inter drop-shadow-small text-sm font-medium rounded-lg h-full w-full text-light-grey cursor-pointer">+1</div>
                                                </div>
                                            </button>
                                            <button
                                                className={cn("p-[2px] rounded-lg w-fit h-9 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                                disabled={remainingTime === 0 && amountError ? true : false}
                                                onClick={() => handleDeposit()}
                                            >
                                                <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                                    <div className="group rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter text-white drop-shadow-small items-center justify-center gap-1.5 cursor-pointer">
                                                        <span className="hidden sm:inline mr-1">Place</span>Bet
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 2xl:gap-4 justify-between w-full h-full -mt-1.5">
                                <div className="flex transition-colors duration-300 p-[2px] rounded-lg h-[84px] w-full bg-layer2">
                                    <div className="flex p-[1px] w-full h-full rounded-lg bg-prime">
                                        <div className="flex flex-col items-center justify-center w-full h-full bg-layer rounded-lg p-3 gap-1 z-[3]">
                                            <div className="flex items-center gap-1.5">
                                                <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                                <div className="font-inter my-0 font-bold text-xl text-white"><span>{totalBetAmount.toFixed(3)}</span></div>
                                            </div>
                                            <p className="font-inter text-sm text-light-grey font-medium">Jackpot Value</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full bg-transparent transition-colors duration-300 rounded-lg h-[84px]">
                                    <div className="flex flex-col items-center justify-center w-full h-full bg-layer rounded-lg border border-border relative z-[3] overflow-hidden">
                                        <div className="flex items-center gap-1.5">
                                            <img src="/images/solana.png" className="object-cover object-center w-6 h-6" alt=""></img>
                                            <div className="font-inter my-0 font-bold text-xl text-white"><span>{wager.toFixed(3)}</span></div>
                                        </div>
                                        <p className="font-inter text-sm text-light-grey font-medium">Your Wager</p>
                                    </div>
                                </div>
                                <div className="flex w-full bg-transparent transition-colors duration-300 rounded-lg h-[84px] relative">
                                    <div className="flex flex-col items-center justify-center w-full h-full bg-layer rounded-lg border border-border relative z-[3] overflow-hidden">
                                        <div className="flex items-center gap-1.5">
                                            <div className="font-inter font-bold text-xl text-white"><span>{chance.toFixed(2)}</span>%</div>
                                        </div>
                                        <p className="font-inter text-sm text-light-grey font-medium">Your Chance</p>
                                    </div>
                                </div>
                                <div className="flex w-full bg-transparent transition-colors duration-300 rounded-lg h-[84px] relative">
                                    <div className="flex flex-col items-center justify-center w-full h-full bg-layer rounded-lg border border-border relative z-[3] overflow-hidden">
                                        <div className="flex items-center gap-1.5">
                                            <h1 className="font-inter font-bold text-xl">
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
                                        <p className="font-inter text-sm text-light-grey font-medium">Time Remaining</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex gap-3">
                                <button className="bg-prime rounded-md px-4 py-2" onClick={manualSetRemainingTime}>SetRemainingTime</button>
                                <button className="bg-prime rounded-md px-4 py-2" onClick={manualBet}>ManualBet</button>
                                <button className="bg-prime rounded-md px-4 py-2" onClick={manualSetWager}>SetWager</button>
                                <button className="bg-prime rounded-md px-4 py-2" onClick={manualSetWinnerIndex}>SetWinnerIndex</button>
                            </div> */}
                            <CardSpinner
                                cards={spinCards}
                                remainingTime={remainingTime}
                                selectCard={winner}
                            // isNewRound={isNewRound}
                            />
                            <div className="w-full min-h-[600px] border-t border-border">
                                <div className="flex md:hidden justify-center mt-4 items-center gap-1.5 pl-2 pr-3 py-2 rounded-lg bg-[#2A62C129]">
                                    <img src="/images/solana.png" className="object-cover object-center w-5 h-5" alt=""></img>
                                    <p className="font-inter text-secondary text-[10px] leading-3">Payouts are settled in SOL</p>
                                </div>
                                <div className="flex justify-between pt-5 text-light-grey text-sm font-book mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Icon icon="material-symbols:person-rounded" width="24" height="24" style={{ color: "#2c5fbf" }} />
                                            <p className="font-inter text-light-grey text-sm leading-4">{players.filter(player => player._id != "").length} Players</p>
                                        </div>
                                        <div className="h-2/3 w-[1px] bg-[#303030]/50 hidden md:block"></div>
                                        <div className="hidden md:flex items-center gap-1.5 pl-2 pr-3 py-[5px] rounded-lg bg-[#2A62C129]">
                                            <img src="/images/solana.png" className="object-cover object-center w-4 h-4" alt=""></img>
                                            <p className="font-inter text-secondary text-[10px] leading-3">Payouts are settled in SOL</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-inter text-[16px] text-secondary">#</p>
                                        <p className="font-inter text-sm text-light-grey">Round: <strong className="text-white font-bold">{round}</strong></p>
                                    </div>
                                </div>
                                <div className="flex flex-col min-h-[92px] gap-4">
                                    {players.length > 0 ? players.map((player, index) =>
                                        <UserCard key={`${player.user_id._id}-${index}`} player={player} />)
                                        : <div className={`flex w-full items-center justify-center border-dashed border-[2px] border-border rounded-xl p-6 font-inter text-white`}>
                                            Waiting <Icon icon="eos-icons:three-dots-loading" width="24" height="24" style={{ color: "#fff" }} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-col gap-6 w-[210px] xs:w-[430px] lg:w-[210px] h-fit flex-wrap m-auto md:m-0 shrink-0">
                        <div className="flex flex-col xs:mx-auto xs:flex-row lg:flex-col gap-6 w-full zoom-80 2xl:zoom-100">
                            <div className="relative h-full w-full" style={{ animationDelay: "0s" }}>
                                <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                    <div className="flex w-full bg-layer2 rounded-[10px] p-[2px] border border-[#2E3E5A]">
                                        <div className="flex bg-gradient-border p-[1px] w-full h-full rounded-[10px]">
                                            <div className="flex flex-col w-full h-full bg-gradient-color gap-4 rounded-[10px]">
                                                <div className="flex flex-col w-full h-full rounded-t-[10px] relative gap-3">
                                                    <img src="/images/download.webp" className="object-cover object-center w-full rounded-t-[10px] absolute top-0 left-0" alt=""></img>
                                                    <div className="rounded-t-[10px] px-3 py-[6px] z-[3]">
                                                        <div className="flex justify-between uppercase text-xs text-light-grey">
                                                            <p>Round</p>
                                                            <p>#{latestWinner.round}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full drop-shadow-small">
                                                        <div className="flex items-center justify-center bg-secondary z-[300] w-[72px] h-[72px] rounded-[10px] p-[1.5px]">
                                                            <div className="flex w-full h-full rounded-[10px] border border-[#03036D]">
                                                                <img src={latestWinner.user_id.avatar} className="object-cover object-center rounded-[10px] w-full h-full" alt=""></img>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1">
                                                        <p className="font-inter text-sm font-semibold max-w-[75px] truncate text-white text-center">{latestWinner.user_id.username}</p>
                                                        <img src="/images/winner.svg" className="object-cover object-center w-full px-10" alt=""></img>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-layer2 rounded-b-[10px] relative py-2 px-3">
                                                    <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full rounded-b-[10px] absolute top-0 left-0" alt=""></img>
                                                    <div className="flex flex-col gap-[2px]">
                                                        <div className="flex items-center w-full justify-between z-[3]">
                                                            <p className="font-inter text-xs text-light-grey">Won</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                <p className="font-inter text-sm font-semibold text-white">{latestWinner.won.toFixed(4)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between z-[3]">
                                                            <p className="font-inter text-xs text-light-grey">Chance</p>
                                                            <p className="font-inter text-sm font-semibold text-white">{Number(latestWinner.chance).toFixed(2)}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative overf h-full w-full" style={{ animationDelay: "0s" }}>
                                <div className="backface-hidden preserve-3d" style={{ transform: "translateZ(-5px)" }}>
                                    <div className="flex w-full bg-layer2 rounded-[10px] p-[2px] border border-[#2E3E5A]">
                                        <div className="flex bg-gradient-border p-[1px] w-full h-full rounded-[10px]">
                                            <div className="flex flex-col w-full h-full bg-gradient-color gap-4 rounded-[10px]">
                                                <div className="flex flex-col w-full h-full rounded-t-[10px] relative gap-3">
                                                    <img src="/images/download.webp" className="object-cover object-center w-full rounded-t-[10px] absolute top-0 left-0" alt=""></img>
                                                    <div className="rounded-t-[10px] px-3 py-[6px] z-[3]">
                                                        <div className="flex justify-between uppercase text-xs text-light-grey">
                                                            <p>Round</p>
                                                            <p>#{luckyUser.round}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center w-full drop-shadow-small">
                                                        <div className="flex items-center justify-center bg-[#FEAE38] z-[300] w-[72px] h-[72px] rounded-[10px] p-[1.5px]">
                                                            <div className="flex w-full h-full rounded-[10px] border border-[#03036D]">
                                                                <img src={luckyUser.user_id.avatar} className="object-cover object-center rounded-[10px] w-full h-full" alt=""></img>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1">
                                                        <p className="font-inter text-sm font-semibold max-w-[75px] truncate text-white text-center">{luckyUser.user_id.username}</p>
                                                        <img src="/images/luck.svg" className="object-cover object-center w-full px-10" alt=""></img>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-layer2 rounded-b-[10px] relative py-2 px-3">
                                                    <img src="/images/static/grid.bb6dda07.webp" className="object-cover object-center w-full h-full rounded-b-[10px] absolute top-0 left-0" alt=""></img>
                                                    <div className="flex flex-col gap-[2px]">
                                                        <div className="flex items-center w-full justify-between z-[3]">
                                                            <p className="font-inter text-xs text-light-grey">Won</p>
                                                            <div className="flex items-center gap-1.5">
                                                                <img src="/images/solana.png" alt="" className="w-3 h-3" />
                                                                <p className="font-inter text-sm font-semibold text-white">{luckyUser.won.toFixed(4)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center w-full justify-between z-[3]">
                                                            <p className="font-inter text-xs text-light-grey">Chance</p>
                                                            <p className="font-inter text-sm font-semibold text-white">{Number(luckyUser.chance).toFixed(2)}%</p>
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
