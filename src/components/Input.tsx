import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const Input: React.FC<IInput> = ({ label, type, edit, func, state, placeholder, setState, disabled, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showValue, setShowValue] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleEditClick = async () => {
        if (isEditing) {
            // Save logic here
            if (onSave) await onSave();
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
        console.log("🚀 ~ handleInputChange ~ e.target.value:", e.target.value)
        setState!(e.target.value);
    };

    return (
        <div className={`flex flex-col gap-2 ${label == "Your Referral Code" ? "" : "mt-6"} w-full font-inter`}>
            <label className="text-sm text-light-grey">{label} <span className="text-[#FF0000]">{label == "Enter name" || label == "Enter Email" ? "*" : ""}</span></label>
            <div className="relative w-full">
                <input
                    disabled={disabled || (edit && !isEditing)}
                    type={showValue ? "text" : type || "text"}
                    className="border-[1px] border-layer2 bg-layer transition-colors duration-300 px-3 h-[40px] rounded-lg w-full text-sm focus:outline-none bg-transparent pr-[80px]"
                    value={state}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                />
                {edit && (
                    <div className="flex absolute inset-y-0 my-auto gap-2 right-1.5 h-max w-max">
                        <div className="flex items-center">
                            {func === "verify" ? (
                                <button
                                    onClick={handleVerifyClick}
                                    className="group relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex bg-gradient-border-btn h-[32px] p-[1px] cursor-pointer"
                                >
                                    <div className="flex w-full h-full items-center justify-center gap-2 bg-layer2 rounded-[10px]">
                                        {isVerified ? (
                                            <Icon icon="material-symbols:check" width="16" height="16" style={{ color: "#4CAF50" }} />
                                        ) : (
                                            <Icon icon="mage:refresh-reverse" width="16" height="16" style={{ color: "#FFFFFF" }} />
                                        )}
                                    </div>
                                </button>
                            ) : func === "show" ? (
                                <button
                                    onClick={handleShowClick}
                                    className="group relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex bg-gradient-border-btn h-[32px] p-[1px] cursor-pointer"
                                >
                                    <div className="flex w-full h-full items-center justify-center gap-2 bg-layer2 rounded-[10px]">
                                        <Icon
                                            icon={showValue ? "bx:hide" : "bx:show-alt"}
                                            width="16"
                                            height="16"
                                            style={{ color: "#FFFFFF" }}
                                        />
                                    </div>
                                </button>
                            ) : null}
                        </div>
                        <button
                            onClick={handleEditClick}
                            className="group relative min-w-10 overflow-hidden rounded-[10px] transition duration-300 w-full text-sm flex bg-gradient-border-btn h-[32px] p-[1px] cursor-pointer"
                        >
                            <div className="flex w-full h-full items-center justify-center px-2.5 gap-2 bg-layer2 rounded-[10px]">
                                {isEditing ? (
                                    <>
                                        <Icon icon="material-symbols:check" width="12" height="12" style={{ color: "#4CAF50" }} />
                                        <div className="font-semibold text-white drop-shadow-small">Save</div>
                                    </>
                                ) : (
                                    <>
                                        <Icon icon="fluent:edit-16-filled" width="12" height="12" style={{ color: "#FFFFFF" }} />
                                        <div className="font-semibold text-white drop-shadow-small">Edit</div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;