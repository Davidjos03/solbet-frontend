import { useEffect, useState } from "react";
import ChatItem from "./ChatItem"
import { useUserProvider } from "@/contexts/UserContext";
import { useSocket } from "@/hooks/useSocket";
import { EChatEvent } from "@/types/socket.d";

const Chat = () => {
    const [messages, setMessages] = useState<IChatItem[]>([]);

    const { userInfo } = useUserProvider();
    const { socket } = useSocket();

    // Socket event handlers
    useEffect(() => {
        if (!socket || !userInfo?.id) return;

        socket.emit(EChatEvent.JOIN, userInfo.id);

        socket.on(EChatEvent.MESSAGE_HISTORY, (data: IChatItem[]) => {
            setMessages(data);
        });

        socket.on(EChatEvent.NEW_MESSAGE, (message: IChatItem) => {
            setMessages(prev => [...prev, message]);
        });

        // socket.on('user-list', (userList) => {
        //     setUsers(userList);
        // });

        return () => {
            socket.off(EChatEvent.MESSAGE_HISTORY);
            socket.off(EChatEvent.NEW_MESSAGE);
            // socket.off('user-list');
        };
    }, [socket, userInfo]);

    return (
        <div className="overflow-y-scroll overscroll-contain h-full mt-[90px] py-3">
            <div className="flex flex-col justify-end gap-2.5 px-6 pb-0">
                {messages && messages.map((chat, index) => (
                    <ChatItem key={index} avatar={chat.avatar} time={chat.time} user={chat.user} content={chat.content} />
                ))}
            </div>
        </div>
    )
}

export default Chat
