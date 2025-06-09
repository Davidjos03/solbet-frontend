import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import cn from "classnames";

import { useUserProvider } from "@/contexts/UserContext";
import Input from "../Input";

const Signin = () => {
    const [user, setUser] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nameErr, setNameErr] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [logup, setLogup] = useState(false);

    const { isLogin, setIsLogin, setUserInfo, setState } = useUserProvider();

    const validateUsername = (value: string): string | null => {
        if (value === "") return null;
        // Regular expression to allow only Latin characters (A-Z, a-z)
        const latinRegex = /^[A-Za-z]*$/;

        // If the input matches the Latin regex, update the state
        if (latinRegex.test(value)) {
            setNameErr(false);
            return null;
        } else {
            setNameErr(true);
            return "Please enter a valid username or email address.";
        }
    };


    const validateEmail = (value: string): string | null => {
        const emailRegex =
            /^(https?:\/\/)?(www\.)?email\.com\/[a-zA-Z0-9_]{1,15}$/;

        if (
            emailRegex.test(value)
        ) {
            setEmailErr(false);
            return null;
        } else {
            setEmailErr(true);
            return "Please enter a valid email address.";
        }
    };

    const handleLogin = (username: string, email?: string) => {
        setUserInfo({ name: username, icon: "/images/user-logo-icon.png", email: email! });
        setIsLogin(true);
        // Call your login function here
        console.log("Logging in with:", { username, email });
    }

    return (
        <div
            className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-500 ${isLogin ? "" : "pointer-events-none"
                }`}
        >
            <div
                className={`fixed inset-0 bg-black transition-opacity bg-[#000000E5] duration-500 ${isLogin ? "opacity-75" : "opacity-0"
                    }`}
                onClick={() => setIsLogin(false)}
            />

            <div
                className={cn(
                    "flex flex-col gap-4",
                    "w-[500px]",
                    "p-6",
                    "rounded-2xl",
                    "bg-[#131123]",
                    "absolute",
                    "z-40",
                    "duration-500 ease-in-out",
                    `${isLogin ? "flex-none" : "scale-0"}`
                )}
            >
                <div className="flex w-full items-center justify-between h-[2rem] gap-4 relative">
                    <p className="font-bold w-full text-white text-center text-[1.5rem] leading-[1.5625rem]">
                        {!logup ? "Sign in" : "Sign up"}
                    </p>
                    <button
                        className="flex items-center justify-center w-8 h-8 p-[6px] rounded-full absolute top-0 right-0"
                        onClick={() => setIsLogin(false)}
                    >
                        <Icon icon="lets-icons:close-round" width="24" height="24" style={{ color: "#B5C3D580" }} />
                    </button>
                </div>
                {!logup ? (
                    <div className="grid grid-rows-1 gap-2 w-full">
                        <Input
                            label="Username"
                            placeholder="Enter username..."
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="grid grid-rows-2 gap-2 w-full">
                        <Input
                            label="username"
                            placeholder="Enter username..."
                            value={username}
                            errState={nameErr}
                            validate={validateUsername}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter email..."
                            value={email}
                            errState={emailErr}
                            validate={validateEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
                <button
                    className="flex items-center justify-center w-full py-[14px] px-4 rounded-full bg-[#349DFF]"
                    onClick={() => {
                        if (logup) {
                            if (username && email) {
                                handleLogin(username, email);
                                setIsLogin(false);
                                setState(true);
                            } else {
                                setNameErr(true);
                                setEmailErr(true);
                            }
                        } else {
                            if (user) {
                                handleLogin(user);
                                setIsLogin(false);
                                setState(true);
                            } else {
                                setNameErr(true);
                            }
                        }
                    }}

                >
                    <p className="font-bold text-[18px] leading-5">{!logup ? "Sign in" : "Sign up"}</p>
                </button>
                <p className="w-full text-[14px] text-[#349DFF] text-right font-normal font inter cursor-pointer" onClick={() => setLogup(!logup)}>{logup ? "Sign in..." : "Sign up..."}</p>
            </div>
        </div >
    );
};

export default Signin;
