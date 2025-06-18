import { useUserProvider } from "@/contexts/UserContext";

const RegisterModal = () => {
    const { isSign, setIsSign } = useUserProvider();

    return (
        <div id="global-modal" className={`${isSign ? "block" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-[#0D0D0D]/75 z-[1000] transition-opacity duration-300 opacity-100" onClick={() => setIsSign(false)}></div>
            <div className="w-full sm:w-max max-w-[calc(100%-32px)] sm:max-w-full h-max absolute inset-0 m-auto z-[1001] transition-all duration-300 scale-100 opacity-100">
                <div className="relative p-[2px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1e293a] to-[#232425]">
                    <div className="relative w-full h-full rounded-2xl main-background">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal
