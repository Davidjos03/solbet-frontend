import React from "react"

const HomeItem: React.FC<IHomeItem> = ({ title, content }) => {
    return (
        <div className='flex flex-col h-[256px] gap-[14px] bg-[#110F1E] opacity-70 rounded-md px-8 py-4 justify-end'>
            <p className="text-[#B5C3D54D] text-[40px] font-bold font-inter">{title}</p>
            <p className="text-[#B5C3D54D] text-[30px] font-medium font-inter">{content}</p>
        </div>
    )
}

export default HomeItem
