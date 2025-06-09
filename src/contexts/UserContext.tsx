import React, { ReactNode, createContext, useContext, useState } from "react";

// Define the shape of the context
interface UserContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isWalletModal: boolean;
  setIsWalletModal: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: IUser;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser>>;
}

// Create the User context with a default value
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create the User context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isWalletModal, setIsWalletModal] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUser>({ name: 'skinfeg11', icon: '/images/user-logo-icon.png' });
  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLogin,
        setIsLogin,
        isWalletModal,
        setIsWalletModal,
        state,
        setState,
        userInfo,
        setUserInfo,
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
