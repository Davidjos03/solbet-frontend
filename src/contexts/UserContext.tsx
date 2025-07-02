// import { getSolPrice } from "@/utils/common";
import { initialArray, waiting } from "@/utils/utils";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
interface UserContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isSign: boolean;
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileModal: boolean;
  setIsProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  solBalance: number;
  setSolBalance: React.Dispatch<React.SetStateAction<number>>;
  messages: IChatItem[];
  setMessages: React.Dispatch<React.SetStateAction<IChatItem[]>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  userInfo: IUser | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  winner: IPlayer | null;
  setWinner: React.Dispatch<React.SetStateAction<IPlayer | null>>;
  latestWinner: IWaiting;
  setLatestWinner: React.Dispatch<React.SetStateAction<IWaiting>>;
  luckyUser: IWaiting;
  setLuckyUser: React.Dispatch<React.SetStateAction<IWaiting>>;
  selectedUser: IProfileModal | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<IProfileModal | null>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  players: IPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  winnerIndex: number | null;
  setWinnerIndex: React.Dispatch<React.SetStateAction<number | null>>;
  solPrice: number;
  setSolPrice: React.Dispatch<React.SetStateAction<number>>;
}

// Create the User context with a default value
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const [isSign, setIsSign] = useState<boolean>(false);
  const [isProfileModal, setIsProfileModal] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser | undefined>();
  const [solBalance, setSolBalance] = useState<number>(0);
  const [messages, setMessages] = useState<IChatItem[]>([]);
  const [round, setRound] = useState<number>(0);
  const [winner, setWinner] = useState<IPlayer | null>(null);
  const [latestWinner, setLatestWinner] = useState<IWaiting>(waiting);
  const [luckyUser, setLuckyUser] = useState<IWaiting>(waiting);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [players, setPlayers] = useState<IPlayer[]>(initialArray)
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<IProfileModal | null>(null);

  useEffect(() => {
    // Function to check and update `isToggle` based on window width
    const handleResize = () => {
      const shouldToggle = window.innerWidth < 1280;
      setIsToggle(!shouldToggle);
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup: Remove event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isToggle,
        setIsToggle,
        isSign,
        setIsSign,
        isProfileModal,
        setIsProfileModal,
        state,
        setState,
        userInfo,
        setUserInfo,
        solBalance,
        setSolBalance,
        messages,
        setMessages,
        round,
        setRound,
        winner,
        setWinner,
        latestWinner,
        setLatestWinner,
        luckyUser,
        setLuckyUser,
        totalAmount,
        setTotalAmount,
        players,
        setPlayers,
        winnerIndex,
        setWinnerIndex,
        solPrice,
        setSolPrice,
        selectedUser,
        setSelectedUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook for consuming the context
export const useUserProvider = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }
  return context;
};
