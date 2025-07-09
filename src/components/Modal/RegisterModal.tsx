import { useUserProvider } from "@/contexts/UserContext";
import Input from "../Input";
import cn from "classnames";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchWithAuth, setAuthToken } from "@/utils/setAuthToken";
import { getBalance } from "@/utils/common";

const RegisterModal = () => {
    const [username, setUsername] = useState<string>("your name");
    const [email, setEmail] = useState<string>("your@gamil.com");
    const [referral, setReferral] = useState<string>("optional");
    const [isCheck, setIsCheck] = useState<boolean>(false)

    const { isSign, setSolBalance, setUserInfo, setIsSign } = useUserProvider();
    const wallet = useWallet();

    const handleSignup = async () => {
        try {
            const userData = {
                username,
                address: wallet.publicKey!.toBase58(),
                email,
                referral
            };

            const res = await fetchWithAuth(`/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify(userData)
            })
            if (res) {
                console.log("🚀 ~ getUser ~ res:", res);
                setAuthToken(res.token);
                setUserInfo(res.user)
                setIsSign(false);
                const balance = await getBalance(wallet.publicKey!)
                setSolBalance(balance)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="global-modal" className={`font-inter ${isSign ? "block" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#0C122C]/80 z-[1000] transition-opacity duration-300" onClick={() => { setIsSign(false); wallet.disconnect(); }}></div>
            <div className="w-full sm:w-max max-w-[calc(100%-32px)] sm:max-w-full h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl bg-layer">
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative block w-full sm:w-[320px] h-[150px] sm:h-full bg-[#1D1D1D] flex-none min-h-unset sm:rounded-l-2xl overflow-hidden">
                                <img src="/images/sign-up.jpg" className="object-cover object-center w-full xl:w-[320px] h-full xl:h-[540px] gb-blur-image" alt=""></img>
                                <div className="absolute bg-gradient-primary-reserve w-full translate-y-0 bottom-0 left-0 h-[200px]"></div>
                            </div>
                            <div className="p-8 sm:w-[385px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-4xl uppercase font-racing leading-[30px]">Sign Up</h4>
                                    <img src="/images/icon.gif" className="object-cover object-center w-[56px] gb-blur-image" alt=""></img>
                                </div>
                                <Input label="Enter name" state={username} setState={setUsername} />
                                <Input label="Enter Email" state={email} setState={setEmail} />
                                <Input label="Referral Code" state={referral} setState={setReferral} />
                                <div className="flex gap-2 my-5 text-[#A2A2A2] hover:text-[#bfbfbf] transition-colors duration-300 cursor-pointer">
                                    <div className="w-5 h-5 bg-layer border border-layer2 rounded-md flex-none p-1" onClick={() => setIsCheck(!isCheck)}>
                                        <div className={`w-full h-full bg-prime rounded-sm shadow-purple-inset transition-transform ${isCheck ? "scale-100" : "scale-0"}`}>
                                        </div>
                                    </div>
                                    <p className="text-sm">
                                        I agree that I am at least
                                        <span className="font-semibold text-white"> 18 Years Old </span>
                                        and agree to the terms and conditions.
                                    </p>
                                </div>
                                <button
                                    disabled={!isCheck}
                                    className={cn("p-[2px] rounded-lg w-full h-11 bg-layer2 transition-opacity duration-300 cursor-pointer")}
                                    onClick={() => handleSignup()}
                                >
                                    <div className="rounded-lg h-full relative bg-gradient-border-color-btn p-[1px]">
                                        <div className="flex items-center justify-center rounded-lg relative h-full min-w-10 overflow-hidden transition duration-300 px-4 py-[6px] w-full bg-prime hover:bg-prime/80 text-sm font-inter text-white drop-shadow-small gap-1.5 cursor-pointer">
                                            Create Account
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal
