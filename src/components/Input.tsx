import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const Input: React.FC<IInput> = ({ label, type, edit, func, state, setState, disabled }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showValue, setShowValue] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleEditClick = () => {
        if (isEditing) {
            // Save logic here
            console.log("Value saved:", state);
        }
        setIsEditing(!isEditing);
    };

    const handleVerifyClick = () => {
        // Verification logic here
        console.log("Verifying email...");
        setIsVerified(true);
        setTimeout(() => setIsVerified(false), 3000); // Show verification status for 3 seconds
    };

    const handleShowClick = () => {
        setShowValue(!showValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState!(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2 mt-6 w-full">
            <label className="text-sm text-[#A2A2A2]">{label}</label>
            <div className="relative w-full">
                <input
                    disabled={disabled || (edit && !isEditing)}
                    type={showValue ? "text" : type || "text"}
                    className="border-[1px] border-[#222222] bg-dark bg-opacity-40 transition-colors duration-300 px-3 h-[44px] rounded-lg w-full text-sm focus:outline-none focus:border-[#3c3c3c] bg-transparent pr-[80px]"
                    value={state}
                    onChange={handleInputChange}
                />
                {edit && (
                    <div className="flex absolute inset-y-0 my-auto gap-2 right-1.5 h-max w-max">
                        <div className="flex items-center">
                            {func === "verify" ? (
                                <button
                                    onClick={handleVerifyClick}
                                    className="group justify-center relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex items-center gap-1 bg-[#1C1C1C] hover:bg-[#212121] h-[32px] px-2.5 cursor-pointer"
                                >
                                    {isVerified ? (
                                        <Icon icon="material-symbols:check" width="16" height="16" style={{ color: "#4CAF50" }} />
                                    ) : (
                                        <Icon icon="mage:refresh-reverse" width="16" height="16" style={{ color: "#A2A2A2" }} />
                                    )}
                                </button>
                            ) : func === "show" ? (
                                <button
                                    onClick={handleShowClick}
                                    className="group justify-center relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex items-center gap-1 bg-[#1C1C1C] hover:bg-[#212121] h-[32px] px-2.5 cursor-pointer"
                                >
                                    <Icon
                                        icon={showValue ? "bx:hide" : "bx:show-alt"}
                                        width="16"
                                        height="16"
                                        style={{ color: "#A2A2A2" }}
                                    />
                                </button>
                            ) : null}
                        </div>
                        <button
                            onClick={handleEditClick}
                            className="group justify-center relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex items-center gap-1 bg-[#1C1C1C] hover:bg-[#212121] h-[32px] px-2.5 cursor-pointer"
                        >
                            {isEditing ? (
                                <>
                                    <Icon icon="material-symbols:check" width="12" height="12" style={{ color: "#4CAF50" }} />
                                    <div className="font-semibold text-white">Save</div>
                                </>
                            ) : (
                                <>
                                    <Icon icon="fluent:edit-16-filled" width="12" height="12" style={{ color: "#A2A2A2" }} />
                                    <div className="font-semibold text-white">Edit</div>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;