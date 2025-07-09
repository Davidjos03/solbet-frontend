import { useEffect } from "react";
import ChatItem from "./ChatItem"
import { useUserProvider } from "@/contexts/UserContext";
import { useChatSocket } from "@/hooks/useChatSocket";
import { EChatEvent } from "@/types/socket";

const Chat = () => {
    const { userInfo, messages, setMessages } = useUserProvider();
    const { chatSocket } = useChatSocket();

    // Socket event handlers
    useEffect(() => {
        if (!chatSocket || !userInfo?._id) return;

        chatSocket.emit(EChatEvent.JOIN, userInfo._id);

        chatSocket.on(EChatEvent.MESSAGE_HISTORY, (data: IChatItem[]) => {
            setMessages(data);
        });

        chatSocket.on(EChatEvent.NEW_MESSAGE, (message: IChatItem) => {
            console.log("🚀 ~ chatSocket.on ~ message:", message)
            setMessages(prev => [...prev, message]);
        });

        // chatSocket.on('user-list', (userList) => {
        //     setUsers(userList);
        // });

        return () => {
            chatSocket.off(EChatEvent.MESSAGE_HISTORY);
            chatSocket.off(EChatEvent.NEW_MESSAGE);
            // chatSocket.off('user-list');
        };
    }, [chatSocket, userInfo]);

    return (
        <div className="flex overflow-y-scroll relative overscroll-contain h-full">
            <div className="absolute bg-gradient-primary w-full translate-y-0 top-0 left-0 h-[40px]"></div>
            <div className="flex flex-col justify-end gap-2.5 px-6 pb-0">
                {messages && messages.map((chat: IChatItem, index: number) => (
                    <ChatItem key={index} {...chat} />
                ))}
            </div>
            <div className="absolute bg-gradient-primary-reserve w-full translate-y-0 bottom-0 left-0 h-[40px]"></div>
        </div>
    )
}

export default Chat
