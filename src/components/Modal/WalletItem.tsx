import React from 'react'

const WalletItem: React.FC<IWalletItem> = ({ title, icon, subtitle, content }) => {
    return (
        <div className='flex flex-col gap-[6px] w-full'>
            <p className="text-white text-[15px] font-bold font-inter h-[15px]">{title}</p>
            <div className='flex items-center justify-start w-full gap-3 rounded-xl p-[14px] bg-[#1D1930] cursor-pointer'>
                {icon && <img src={icon} alt="No icon" className="w-[49px] h-[49px]" />}
                <div className='flex flex-col items-center gap-1'>
                    {subtitle && <p className="w-full text-white text-[15px] font-bold font-inter text-start">{subtitle}</p>}
                    {content && <p className="w-full text-[#635C85] text-[15px] font-semibold font-inter text-start">{content}</p>}
                </div>
            </div>
        </div>
    )
}

export default WalletItem
