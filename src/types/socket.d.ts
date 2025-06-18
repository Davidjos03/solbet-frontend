export enum EChatEvent {
    JOIN = 'join',
    MESSAGE = 'message',
    MESSAGE_HISTORY = 'message_history',
    NEW_MESSAGE = 'new_message'
}

export interface IChatClientToServerEvents {
    [EChatEvent.JOIN]: (id: string) => void;
    [EChatEvent.MESSAGE]: ({ content, sender }: {
        content: string,
        sender: string
    }) => void;
}

export interface IChatServerToClientEvents {
    [EChatEvent.MESSAGE_HISTORY]: (messages: IChatItem[]) => void;
    [EChatEvent.NEW_MESSAGE]: (message: IChatItem) => void;
}