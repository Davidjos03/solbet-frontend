import { useUserProvider } from "@/contexts/UserContext";
import Input from "../Input";
import cn from "classnames";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchWithAuth, setAuthToken } from "@/utils/setAuthToken";
import { getBalance } from "@/utils/common";

const RegisterModal = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [refferal, setRefferal] = useState<string>("");
    const [isCheck, setIsCheck] = useState<boolean>(false)

    const { isSign, setSolBalance, setUserInfo, setIsSign } = useUserProvider();
    const wallet = useWallet();

    const handleSignup = async () => {
        try {
            const userData = {
                username,
                address: wallet.publicKey!.toBase58(),
                email,
                refferal
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
        <div id="global-modal" className={`${isSign ? "block" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#0D0D0D]/75 z-[1000] transition-opacity duration-300 opacity-100" onClick={() => setIsSign(false)}></div>
            <div className="w-full sm:w-max max-w-[calc(100%-32px)] sm:max-w-full h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl main-background">
                        <div className="flex flex-col sm:flex-row">
                            <div className="block w-full sm:w-[320px] h-[150px] sm:h-full bg-[#1D1D1D] flex-none min-h-unset sm:rounded-l-2xl overflow-hidden">
                                <img src="/images/sign-up.jpg" className="object-cover object-center w-full xl:w-[320px] h-full xl:h-[540px] gb-blur-image" alt=""></img>
                            </div>
                            <div className="p-8 sm:w-[385px]">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-4xl uppercase font-bold font-airstrike leading-[30px]">Sign Up</h4>
                                    <img src="/images/icon.gif" className="object-cover object-center w-[56px] gb-blur-image" alt=""></img>
                                </div>
                                <Input label="Enter name" state={username} setState={setUsername} />
                                <Input label="Enter Email" state={email} setState={setEmail} />
                                <Input label="Refferal Code" state={refferal} setState={setRefferal} />
                                <div className="flex gap-2 my-5 text-[#A2A2A2] hover:text-[#bfbfbf] transition-colors duration-300 cursor-pointer">
                                    <div className="w-5 h-5 bg-[#0D0D0D] border border-[#222222] rounded-md flex-none p-1" onClick={() => setIsCheck(!isCheck)}>
                                        <div className={`w-full h-full bg-[#418dff] rounded-sm shadow-purple-inset transition-transform ${isCheck ? "scale-100" : "scale-0"}`}>
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
                                    className={
                                        cn(
                                            "bg-gradient-to-t from-[#192130] to-[#162231] p-[3px] rounded-2xl transition-opacity duration-300 cursor-pointer",
                                            "w-full",
                                            "outline-none"
                                        )}
                                    onClick={() => handleSignup()}
                                >
                                    <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#6797df] to-[#2a64cf] border-[1px] border-[#1b1b1b]">
                                        <div className="group relative h-10 min-w-10 overflow-hidden rounded-[10px] transition duration-300 px-4 w-full bg-[#2c5fbf] hover:bg-[#2c5fbf]/75 text-sm font-bold text-[#E3E3E3] flex items-center justify-center gap-1.5 ml-auto cursor-pointer" style={{ textShadow: "rgba(0, 0, 0, 0.5) 0px 2px" }}>
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
