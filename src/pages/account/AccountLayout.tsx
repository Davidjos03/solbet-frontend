import { Outlet } from "react-router-dom";
import AccountSidebar from "./AccountSidebar";

const AccountLayout = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh-110px)] h-full px-6 md:px-10 lg:px-16 py-12 mb-20 mt-12 md:mt-16 lg:mt-28">
            <div className="opacity-100 translate-y-2 animate-fade-y">
                <div className="flex flex-col md:flex-row max-w-[790px] mx-auto w-full h-full">
                    <AccountSidebar />
                    <Outlet /> {/* This renders the nested routes */}
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;