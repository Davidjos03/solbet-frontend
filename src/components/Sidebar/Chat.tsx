import ChatItem from "./ChatItem"

const Chat = () => {
    const chats: IChatItem[] = [
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "9fddb4e7b9f48a521886e34bd22474b9ae8da2665a6983b2923f5a3a6e60d81b.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
    ]

    return (
        <div className="overflow-y-scroll overscroll-contain h-full">
            <div className="flex flex-col justify-end gap-2.5 px-6 pb-0">
                {chats && chats.map((chat, index) => (
                    <ChatItem key={index} image={chat.image} time={chat.time} user={chat.user} msg={chat.msg} />
                ))}
            </div>
        </div>
    )
}

export default Chat
