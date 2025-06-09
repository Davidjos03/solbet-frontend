import ChatItem from "./ChatItem"

const Chat = () => {
    const chats: IChatItem[] = [
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
            time: "20:10",
            user: "smdjg",
            msg: "Qweezy go into pot"
        },
        {
            image: "a16f18d0d596d1faf39ecde21f66ab4b155624f0979085d5ed3905a4c2868488.jpeg",
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
