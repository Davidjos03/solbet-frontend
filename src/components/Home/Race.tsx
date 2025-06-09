
const Race = () => {
    return (
        <div className="flex flex-col w-full h-full gap-[72px] px-4 pt-[30px] pb-[37px] bg-[#110F1E] opacity-70 rounded-md">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center gap-[18px]">
                    <img
                        src="/images/cup-icon.svg"
                        alt="No cup icon"
                        className="w-[36px] h-[36px]"
                    />
                    <p className="text-white text-[20px] font-extrabold font-inter uppercase">WEEKLY RACE</p>
                </div>
                <div className="flex w-[80%] h-[3px] bg-[#B5C3D5] rounded-[1px]"></div>
                <p className="text-[#B5C3D5B2] text-[15px] font-extrabold font-inter">Play in our <span className="text-white">R$100k</span> weekly race</p>
            </div>
            <button className="flex items-center justify-center w-[171px] h-[50px] rounded-md bg-[#349DFF] text-white text-[20px] font-bold font-inter">Deposit</button>
        </div>
    )
}

export default Race
