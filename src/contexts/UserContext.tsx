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
  userInfo: IUser | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<IUser | undefined>>;
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
