import Sidebar from "@/pages/Sidebar";
import GameBoard from "./GameBoard";

const Dashboard = () => {

  return (
    <div className="flex w-full h-full relative">
      <Sidebar />
      <GameBoard />
    </div>
  );
};

export default Dashboard;
