export enum ESOCKET_NAMESPACE {
    chat = '/chat',
    game = '/game',
}

export enum EChatEvent {
    JOIN = 'join',
    MESSAGE = 'message',
    MESSAGE_HISTORY = 'message_history',
    NEW_MESSAGE = 'new_message'
}

export enum EGameEvent {
    UPDATE_ROUND = 'update_round',
    DURATION_STATE = 'duration_state',
    WINNER = 'winner',
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

export interface IGameServerToClientEvents {
    [EGameEvent.DURATION_STATE]: (state: boolean) => void;
    [EGameEvent.UPDATE_ROUND]: (messages: number) => void;
    [EGameEvent.WINNER]: (message: string) => void;
}