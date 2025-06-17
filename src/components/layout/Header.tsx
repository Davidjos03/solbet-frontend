import { PreHeader, WavingTextFlag } from "../Header";

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full h-[70px] lg:h-[110px] flex items-center z-[6]">
            <a href="/" className="flex items-center justify-center w-[100px] bg-[#1d2631] bg-opacity-95 xl:w-[300px] 2xl:w-[350px] h-full flex-none relative border-r border-[#1D1D1D] z-[5000] active" aria-current="page">
                <img src="/images/header-glow.webp" alt="" className="object-cover object-center absolute top-0 left-0 w-full h-full -z-[1] opacity-50" />
                <div className="flex items-center">
                    <img src="/images/icon.gif" alt="" className='object-cover object-center lg:w-[100px] w-[80px]' />
                    <WavingTextFlag />
                    {/* <img src="/images/name.png" alt="" className='object-cover object-center w-[115px] custom-spin' /> */}
                </div>
            </a>
            <PreHeader />
        </div>
    )
}

export default Header
