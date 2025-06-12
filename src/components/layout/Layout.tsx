import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Icon } from "@iconify-icon/react";
import { useUserProvider } from "@/contexts/UserContext";
import ProfileModal from "../Modal/ProfileModal";

const Layout = () => {
  const { setIsToggle } = useUserProvider()

  return (
    <div className="min-h-full h-screen w-full pt-0 pb-0 block">
      <div className="fixed top-0 left-0 w-full h-full bg-[#0e0e0e]/90 z-[10000] flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none">
        <div className="absolute top-0 z-30 h-0.5 w-full">
          <div className="animate-top-loader h-full w-1/2 bg-[#6741FF]"></div>
        </div>
        <img src="/images/grey.webp" className="object-cover object-center w-[100px] h-auto aspect-[594/468] relative z-[2] drop-shadow-[0px_20px_20px_rgba(0,0,0,0.4)]" alt=""></img>
        <div className="w-[150px] h-[150px] bg-[#6741FF] rounded-full blur-[150px] absolute inset-0 m-auto animate-glow-pulse"></div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-[69px] bg-[#141414] border-t border-[#1D1D1D] z-[6] flex items-center gap-3 md:hidden px-3">
        <button
          className="bg-gradient-to-t from-[#222222] to-[#303030] rounded-2xl transition-opacity duration-300 cursor-pointer mr-auto flex md:hidden w-12 p-0 h-12 absolute z-20"
          onClick={() => setIsToggle(true)}
        >
          <div className="p-0.5 rounded-xl w-full h-full relative bg-gradient-to-b from-[#454545] to-[#232323] border-[1px] border-[#1D1D1D]">
            <div className="group flex items-center justify-center relative h-10 min-w-10 overflow-hidden transition duration-300 w-full bg-[#303030] hover:bg-[#393939]/75 text-sm font-medium [text-shadow:0px_2px_rgba(0,0,0,0.5)] text-white rounded-lg p-0 cursor-pointer">
              <Icon icon="tabler:message-filled" width="16" height="16" style={{ color: "#A2A2A2" }} />
            </div>
          </div>
        </button>
      </div>
      <Header />
      <Outlet />
      <div className="intercom-lightweight-app">
        <div className="intercom-lightweight-app-launcher intercom-launcher" role="button" tabIndex={0} aria-label="Open Intercom Messenger" aria-live="polite">
          <div className="intercom-lightweight-app-launcher-icon intercom-lightweight-app-launcher-icon-open">
            <img src="/images/ca194ca0d6f809f30f8d6e396686795d.png" alt="" className="intercom-lightweight-app-launcher-custom-icon-open"></img>
          </div>
        </div>
      </div>
      <ProfileModal />
    </div>
  );
};

export default Layout;
