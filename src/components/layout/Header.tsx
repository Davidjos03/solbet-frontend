import { PreHeader, WavingTextFlag } from "../Header";

const Header = () => {

    return (
        <div className="fixed top-0 left-0 w-full h-[72px] lg:h-[110px] flex bg-main items-center z-[6]">
            <a href="/" className="flex items-center justify-center px-2 py-6 w-[80px] lg:w-[100px] xl:w-[300px] 2xl:w-[350px] h-full flex-none relative border border-border z-[5000]" aria-current="page">
                <div className="flex items-center gap-3">
                    <img src="/images/icon.gif" alt="" className='object-cover object-center lg:w-[80px] w-[60px]' />
                    <WavingTextFlag />
                </div>
            </a>
            <PreHeader />
        </div>
    )
}

export default Header
