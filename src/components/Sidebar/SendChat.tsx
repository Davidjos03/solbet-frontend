import { useUserProvider } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import { EChatEvent } from "@/types/socket";
import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const SendChat = () => {
    const [input, setInput] = useState<string>("");

    const { userInfo, messages } = useUserProvider()
    const { chatSocket } = useChatSocket();

    const sendMessage = () => {
        if (input.trim() && chatSocket && userInfo) {
            chatSocket.emit(EChatEvent.MESSAGE, {
                content: input,
                sender: userInfo._id
            });
            setInput('');
        }
    };

    return (
        <div className="relative opacity-100 animate-fade-in">
            <div className="absolute hidden bg-gradient-to-b from-[#223150] to-[#0f1823] p-[1px] w-[calc(100%-1rem)] mx-auto bottom-full inset-x-0 z-[5] rounded-md transition-[transform,opacity] duration-300 cursor-pointer shadow-md opacity-100 translate-y-0">
                <div className="flex items-center justify-between bg-[#162135] text-[#919191] pointer-events-none w-full h-max px-3 py-2 backdrop-blur-xl rounded-md">
                    <div className="flex items-center gap-1.5 text-sm text-[#E3E3E3]">
                        <Icon icon="material-symbols-light:pause-rounded" width="24" height="24" style={{ color: "#E3E3E3" }} />
                        <p>Chat Paused</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between p-4 pt-3 shrink-0 gap-2">
                <div className="relative w-full">
                    <textarea
                        name="message"
                        id="sendMsg"
                        placeholder="Type Message Here..."
                        maxLength={160}
                        value={input}
                        className="bg-transparent border-[1px] border-[#222222] bg-[#162135] transition-colors duration-300 px-3 rounded-lg w-full text-sm focus:outline-none focus:border-[#3c3c3c] min-h-[44px] py-2.5 align-bottom resize-none overflow-hidden h-auto focus:placeholder:text-white/10 placeholder:transition-colors placeholder:duration-300 pr-10"
                        style={{
                            height: "42px"
                        }}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    <div
                        className="absolute inset-y-0 my-auto right-1.5 h-max w-max mt-1.5"
                        onClick={sendMessage}
                    >
                        <div className="flex items-center gap-1.5 cursor-pointer text-[#A2A2A2] transition-colors">
                            <button
                                className="w-8 h-8 flex items-center justify-center outline-none bg-transparent hover:bg-[#446ab1]/15 transition-colors duration-300 rounded-full p-1"
                                type="button"
                                aria-expanded="false"
                                id="headlessui-popover-button-:rk9:"
                            >
                                <Icon icon="mdi:emoji" width="24" height="24" style={{ color: "#446ab1" }} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1.5 cursor-pointer text-[#A2A2A2] hover:text-white transition-colors">
                        <Icon icon="icon-park-solid:info" width="12" height="12" style={{ color: "#A2A2A2" }} />
                        <p className="text-sm font-medium leading-[21px]">Chat Rules</p>
                    </div>
                    <div className="flex items-center gap-1.5 cursor-pointer text-[#A2A2A2] transition-colors">
                        <Icon icon="tabler:message-filled" width="16" height="16" style={{ color: "#A2A2A2" }} />
                        <p className="text-sm font-medium leading-[21px]">{messages.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendChat
