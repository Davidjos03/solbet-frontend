// import { ChatItem, SendChat } from "../Sidebar";
import { Icon } from "@iconify-icon/react";
import { Chat, SendChat } from "../components/Sidebar";
import { useUserProvider } from "@/contexts/UserContext";

const Sidebar = () => {
  const { setIsToggle } = useUserProvider();

  return (
    <div className="flex w-fit h-full z-10">
      <div className={`xl:flex xl:flex-col fixed left-0 top-[70px] lg:top-[110px] w-[350px] lg:w-[300px] 2xl:w-[350px] h-[calc(100%-70px)] lg:h-[calc(100%-110px)] bg-[#141414] border-r border-[#1D1D1D] transition-transform duration-300 will-change-transform hidden`}>
        <div className="absolute w-full px-6 py-4 bg-[#141414] top-0 left-0 z-[10] grow-0 shrink-0 animate-fade-in">
          <div className="flex gap-2 mb-3">
            <button className="group flex items-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 w-full bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg border border-[#3B3B3B] justify-between cursor-pointer">
              <div className="flex items-center gap-1 text-[#E3E3E3] font-book whitespace-nowrap w-[calc(100%-40px)] truncate">
                <Icon icon="game-icons:shark-bite" width="12" height="12" style={{ color: "#E3E3E3" }} />
                <p className="truncate drop-shadow-[0px_2px_0px_rgba(0,0,0,0.5)]">Degen Chat</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-max h-max bg-[#6741FF]/40 p-1 rounded-full">
                  <div className=" w-1.5 h-1.5 bg-[#6741FF] rounded-full">
                  </div>
                </div>
                <p className="text-sm text-[#E3E3E3] font-book">324</p>
              </div>
            </button>
            <button
              className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg w-max px-0 border border-[#3B3B3B] cursor-pointer"
              onClick={() => setIsToggle(false)}
            >
              <Icon icon="fluent:arrow-previous-16-filled" width="16" height="16" style={{ color: "#E3E3E3" }} />
            </button>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-gradient-to-b from-[#20202E] to-[#231D42] border-b border-[#2C2653] relative overflow-hidden p-3 transition-[height] duration-700 h-[65px] 2xl:h-[82px]">
            <div className="absolute top-0 w-full h-0.5 left-0 bg-[#48485F]">
              <div
                className="bg-gradient-to-r to-[#4127A8] from-[#6741FF] w-1/2 h-full transition-[width] ease-linear duration-1000"
                style={{
                  width: "9%"
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between transition-[transform,opacity] duration-700 w-full">
              <div>
                <div className="flex items-center gap-1.5 mb-1 2xl:mb-0">
                  <span className="uppercase font-bold text-sm text-white 2xl:text-base leading-[19px] 2xl:leading-[23px] relative left-[2px]">Live</span>
                  <Icon icon="rivet-icons:info-circle-solid" width="12" height="12" style={{ color: "#8A8AA3" }} />
                </div>
                <div className="relative text-xl leading-[20px] 2xl:text-[24px] 2xl:leading-[24px]">
                  <span className="text-emboss uppercase font-black text-[#572aa0] absolute inset-0 m-auto text-black mix-blend-screen">Airdrop</span>
                  <span className="uppercase font-black bg-[#8567FF] text-[#572aa0] whitespace-nowrap text-transparent bg-clip-text">Airdrop</span>
                </div>
              </div>
              <div className="flex bg-[#1C1C28] hover:bg-[#242433] transition-colors duration-300 p-1 pl-2 2xl:p-3 2xl:pr-1.5 h-[36px] 2xl:h-[44px] items-center justify-center rounded-[9px] gap-2.5 cursor-pointer">
                <div className="flex items-center drop-shadow-icon gap-1">
                  <img src="/images/3d-sol.webp" className="object-cover object-center w-5 2xl:w-[24px] h-auto" alt=""></img>
                  <span className="font-black text-sm text-white 2xl:text-base">0.251</span>
                </div>
                <button className="group relative overflow-hidden transition duration-300 bg-[#6741FF] hover:bg-[#6741FF]/75 text-sm font-bold flex items-center justify-center shadow-purple-inset w-[28px] h-[28px] 2xl:w-[32px] 2xl:h-[32px] p-0 min-w-0 text-white rounded-md 2xl:rounded-lg cursor-pointer">
                  <Icon icon="fa6-solid:circle-dollar-to-slot" width="16" height="16" style={{ color: "#ffffff" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Chat />
        <SendChat />
      </div>
      <button
        className="left-0 items-center justify-center min-w-10 transition duration-300 px-4 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg absolute top-[84px] lg:top-[124px] z-[35] w-[56px] h-[56px] rounded-l-none border-r-[2px] border-[#3B3B3B] will-change-transform block xl:hidden opacity-100 animate-fade-in cursor-pointer"
        onClick={() => setIsToggle(true)}
      >
        <Icon icon="tabler:message-filled" width="28" height="28" style={{ color: "#A2A2A2" }} />
      </button>
    </div>
  );
};

export default Sidebar;
