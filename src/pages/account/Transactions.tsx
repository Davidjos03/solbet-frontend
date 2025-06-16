import { Icon } from "@iconify-icon/react";

const TransactionsPage = () => {
    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <div>
                <h4 className="mb-4 text-sm">Transactions</h4>
                <div className="flex gap-2 px-4 mb-3">
                    <div className="text-sm text-[#A2A2A2] w-[18%]">ID</div>
                    <div className="text-sm text-[#A2A2A2] w-[22%]">Prize</div>
                    <div className="text-sm text-[#A2A2A2] w-[19%]">Type</div>
                    <div className="text-sm text-[#A2A2A2] w-[12%]">Status</div>
                    <div className="text-sm text-[#A2A2A2] w-[29%] text-right flex-none">Date</div>
                </div>
                <div className="flex justify-between items-center w-full mt-4">
                    <p className="text-sm text-[#A2A2A2]">0 - 0 of Transactions</p>
                    <div className="flex gap-2">
                        <button className="bg-[#303030] w-9 h-9 flex items-center justify-center rounded-lg border border-[#3B3B3B]">
                            <Icon icon="ic:round-navigate-before" width="16" height="16" style={{ color: "#fff" }} />
                        </button>
                        <button className="bg-[#303030] w-9 h-9 flex items-center justify-center rounded-lg border border-[#3B3B3B]">
                            <Icon icon="ic:round-navigate-next" width="16" height="16" style={{ color: "#fff" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;