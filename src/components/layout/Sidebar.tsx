// import { ChatItem, SendChat } from "../Sidebar";
import { Icon } from "@iconify-icon/react";
import { Chat, SendChat } from "../Sidebar";
import { useUserProvider } from "@/contexts/UserContext";

const Sidebar = () => {
  const { isToggle, setIsToggle } = useUserProvider();

  return (
    <div className="flex w-fit h-full z-10 duration-300">
      <div className={`fixed left-0 top-[70px] ${isToggle ? "w-[350px] xl:w-[300px] 2xl:w-[350px] xl:bg-opacity-0 bg-[#1e2a38]" : "w-[0px] "} flex flex-col lg:top-[110px] h-[calc(100%-70px)] lg:h-[calc(100%-110px)] border-r border-[#1D1D1D] duration-300 overflow-hidden object-cover`}>
        <div className="w-full px-6 py-4 bg-main top-0 left-0 z-[10] grow-0 shrink-0 animate-fade-in">
          <div className="flex w-full gap-2">
            <button className="flex w-full bg-gradient-border-btn p-[1px] rounded-lg">
              <div className="group flex items-center relative h-9 min-w-10 overflow-hidden transition duration-300 px-4 w-full bg-[#37445C] hover:bg-[#37445C]/75 rounded-lg justify-between cursor-pointer">
                <div className="flex items-center gap-1 font-inter whitespace-nowrap w-[calc(100%-40px)] truncate">
                  <Icon icon="heroicons-solid:chat" width="16" height="16" className="drop-shadow-small" style={{ color: "#fff" }} />
                  <p className="font-bold text-xs truncate text-white drop-shadow-small">Degen Chat</p>
                </div>
                <div className="flex gap-1.5 items-center justify-center">
                  <div className="flex items-center justify-center w-3 h-3 bg-[#09A0FC]/40 rounded-full">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full">
                    </div>
                  </div>
                  <p className="text-sm text-light-grey font-book">324</p>
                </div>
              </div>
            </button>
            <button className="flex w-fit bg-gradient-border-btn p-[1px] rounded-lg" onClick={() => setIsToggle(false)}>
              <div
                className="group flex items-center justify-center h-9 px-4 transition duration-300 bg-[#37445C] hover:bg-[#37445C]/75 rounded-lg cursor-pointer"
              >
                <Icon icon="fluent:arrow-previous-16-filled" width="14" height="14" style={{ color: "#fff" }} />
              </div>
            </button>
          </div>
        </div>
        <Chat />
        <SendChat />
      </div>
      <button
        className={`left-0 items-center justify-center min-w-10 transition duration-300 px-3 bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium text-white rounded-lg fixed top-[84px] lg:top-[124px] z-[35] w-[56px] h-[56px] rounded-l-none border-r-[2px] border-[#3B3B3B] will-change-transform ${isToggle ? "hidden xl:hidden" : "md:block hidden"} opacity-100 animate-fade-in cursor-pointer`}
        onClick={() => setIsToggle(true)}
      >
        <Icon icon="tabler:message-filled" width="28" height="28" style={{ color: "#cecece" }} />
      </button>
    </div>
  );
};

export default Sidebar;
