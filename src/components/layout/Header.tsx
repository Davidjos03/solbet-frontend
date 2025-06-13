import { PreHeader } from "../Header";

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full h-[70px] lg:h-[110px] flex items-center z-[6]">
            <a href="/" className="flex items-center justify-center w-[100px] xl:w-[300px] 2xl:w-[350px] h-full flex-none relative border-r border-[#1D1D1D] z-[5000] active" aria-current="page">
                <img src="/images/header-glow.webp" alt="" className="object-cover object-center absolute top-0 left-0 w-full h-full -z-[1] opacity-50" />
                <div className="flex items-center gap-4">
                    <img src="/images/icon.gif" alt="" className='object-cover object-center w-[60px]' />
                    <p className="text-[#E3E3E3] text-[32px] font-extrabold uppercase xl:block hidden">solbet</p>
                </div>
            </a>
            <PreHeader />
        </div>
    )
}

export default Header
