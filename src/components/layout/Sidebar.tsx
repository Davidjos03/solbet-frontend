// import { ChatItem, SendChat } from "../Sidebar";
import { Icon } from "@iconify-icon/react";
import { Chat, SendChat } from "../Sidebar";
import { useUserProvider } from "@/contexts/UserContext";

const Sidebar = () => {
  const { isToggle, setIsToggle } = useUserProvider();

  return (
    <div className="flex w-fit h-full z-10  relative duration-300">
      <div className={`fixed left-0 top-[70px] ${isToggle ? "w-[350px] xl:w-[300px] 2xl:w-[350px] xl:bg-opacity-0 bg-[#1e2a38]" : "w-[0px] "} flex flex-col lg:top-[110px] h-[calc(100%-70px)] lg:h-[calc(100%-110px)] border-r border-[#1D1D1D] duration-300 overflow-hidden object-cover`}>
        <div className="absolute w-full px-6 py-4 bg-[#0d152cb9] top-0 left-0 z-[10] grow-0 shrink-0 animate-fade-in">
          <div className="flex gap-2 mb-3">
            <button className="group flex items-center relative h-10 min-w-10 overflow-hidden transition duration-300 px-4 w-full bg-[#0d152c] hover:bg-[#0d152c]/75 text-sm font-medium text-white rounded-lg border border-[#3B3B3B] justify-between cursor-pointer">
              <div className="flex items-center gap-1 text-[#E3E3E3] font-book whitespace-nowrap w-[calc(100%-40px)] truncate">
                <Icon icon="game-icons:shark-bite" width="12" height="12" style={{ color: "#E3E3E3" }} />
                <p className="truncate drop-shadow-[0px_2px_0px_rgba(0,0,0,0.5)]">Degen Chat</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-max h-max bg-[#4232d3]/40 p-1 rounded-full">
                  <div className=" w-1.5 h-1.5 bg-[#4232d3] rounded-full">
                  </div>
                </div>
                <p className="text-sm text-[#E3E3E3] font-book">324</p>
              </div>
            </button>
            <button
              className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 bg-[#0d152c] hover:bg-[#0d152c]/75 text-sm font-medium text-white rounded-lg w-max px-0 border border-[#3B3B3B] cursor-pointer"
              onClick={() => setIsToggle(false)}
            >
              <Icon icon="fluent:arrow-previous-16-filled" width="16" height="16" style={{ color: "#E3E3E3" }} />
            </button>
          </div>
          <div className="absolute bg-gradient-to-b from-[#0d152c] to-[#0d152c]/0 w-full translate-y-[40px] bottom-0 left-0 h-[40px]"></div>
        </div>
        <Chat />
        <SendChat />
      </div>
      <button
        className={`left-0 items-center justify-center min-w-10 transition duration-300 px-4 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg fixed top-[84px] lg:top-[124px] z-[35] w-[56px] h-[56px] rounded-l-none border-r-[2px] border-[#3B3B3B] will-change-transform ${isToggle ? "hidden xl:hidden" : "md:block hidden"} opacity-100 animate-fade-in cursor-pointer`}
        onClick={() => setIsToggle(true)}
      >
        <Icon icon="tabler:message-filled" width="28" height="28" style={{ color: "#cecece" }} />
      </button>
    </div>
  );
};

export default Sidebar;
