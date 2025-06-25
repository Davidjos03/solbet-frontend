import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/setAuthToken";
import { Icon } from "@iconify-icon/react";
import { useUserProvider } from "@/contexts/UserContext";
import Transactions from "@/components/account/Transactions/Transactions";

const showNum = 10;

const TransactionsPage = () => {
    const [transactions, setTransaction] = useState<IHistory[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);

    const { userInfo } = useUserProvider();

    const handlePrev = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (totalPage != currentPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleOpen = (data: boolean) => {
        setOpen(data);
    }

    const getTransactions = async (user: IUser, page: number) => {
        const res = await fetchWithAuth(`/api/game/history`, {
            method: 'POST',
            body: JSON.stringify({ id: user._id, page })
        })
        console.log("🚀 ~ getUser ~ res:", res)
        if (res) {
            setTransaction(res.data);
            setTotalCnt(res.total);
            setTotalPage(res.totalPage)
        }
    }

    useEffect(() => {
        if (userInfo) {
            const fetchData = async () => {
                await getTransactions(userInfo, currentPage);
            };
            fetchData();
        }
    }, [currentPage, userInfo])

    return (
        <div className="w-full sm:px-4 md:px-8 md:pt-14 opacity-100 translate-y-2 animate-fade-y">
            <div>
                <h4 className="mb-4 text-sm">Transactions</h4>
                <div className="flex gap-2 px-4 mb-3">
                    <div className="text-sm text-start text-[#A2A2A2] w-[18%]">ID</div>
                    <div className="text-sm text-start text-[#A2A2A2] w-[20%]">Prize</div>
                    <div className="text-sm text-start text-[#A2A2A2] w-[15%]">Type</div>
                    <div className="text-sm text-start text-[#A2A2A2] w-[12%]">Status</div>
                    <div className="text-sm text-[#A2A2A2] w-[35%] text-end flex-none">Date</div>
                </div>
                <div className="w-full max-h-[550px] px-3 bg-[#22222250] border border-[#9999997a] rounded-xl">
                    {transactions && transactions.map((transaction, index) => (
                        <Transactions key={index} transaction={transaction} open={open} setOpen={handleOpen} />
                    ))}
                </div>
                <div className="flex justify-between items-center w-full mt-4">
                    <p className="text-sm text-[#A2A2A2]">
                        {transactions?.length
                            ? `${(currentPage - 1) * showNum + 1}-${Math.min(
                                currentPage * showNum,
                                totalCnt
                            )} of ${totalCnt} Transactions`
                            : 'Loading transactions...'}
                    </p>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage == 1 ? true : false}
                            className={`bg-[#303030] w-9 h-9 flex items-center ${currentPage == 1 ? "cursor-not-allowed" : "cursor-pointer"} justify-center rounded-lg border border-[#3B3B3B]`}
                            onClick={handlePrev}
                        >
                            <Icon icon="ic:round-navigate-before" width="16" height="16" style={{ color: "#fff" }} />
                        </button>
                        <button
                            disabled={currentPage == totalPage ? true : false}
                            className={`bg-[#303030] w-9 h-9 flex items-center ${currentPage == totalPage ? "cursor-not-allowed" : "cursor-pointer"} justify-center rounded-lg border border-[#3B3B3B]`}
                            onClick={handleNext}
                        >
                            <Icon icon="ic:round-navigate-next" width="16" height="16" style={{ color: "#fff" }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;