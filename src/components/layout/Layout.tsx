import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-full h-screen w-full pt-0 pb-0 block">
      <div className="fixed top-0 left-0 w-full h-full bg-[#0e0e0e]/90 z-[10000] flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none">
        <div className="absolute top-0 z-30 h-0.5 w-full">
          <div className="animate-top-loader h-full w-1/2 bg-[#6741FF]"></div>
        </div>
        <img src="/images/grey.webp" className="object-cover object-center w-[100px] h-auto aspect-[594/468] relative z-[2] drop-shadow-[0px_20px_20px_rgba(0,0,0,0.4)]" alt=""></img>
        <div className="w-[150px] h-[150px] bg-[#6741FF] rounded-full blur-[150px] absolute inset-0 m-auto animate-glow-pulse"></div>
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
    </div>
  );
};

export default Layout;
