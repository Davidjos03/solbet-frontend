
const Bonus = () => {
    return (
        <div className="flex flex-col w-full h-full gap-[61px] px-[26px] pt-[30px] pb-[37px] bg-[#110F1E] opacity-70 rounded-md">
            <div className="flex flex-col gap-4">
                <p className="text-white text-[36px] font-extrabold font-inter uppercase">huge <span className="text-[#349DFF]">bunus</span></p>
                <p className="text-white text-[20px] font-extrabold font-inter uppercase">FOR EVERY DEPOSITS THIS WEEK</p>
            </div>
            <div className="flex flex-col gap-[30px]">
                <p className="text-[#B5C3D5B2] text-[15px] font-extrabold font-inter">Deposit now to receive an additional $10 bonus added to your account.</p>
                <button className="flex items-center justify-center w-[171px] h-[50px] rounded-md bg-[#349DFF] text-white text-[20px] font-bold font-inter">Deposit</button>
            </div>
        </div>
    )
}

export default Bonus
