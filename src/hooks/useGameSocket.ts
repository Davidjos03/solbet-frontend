import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/constants/envConstants';
import { ESOCKET_NAMESPACE, IGameClientToServerEvents, IGameServerToClientEvents } from '@/types/socket';

export const useGameSocket = () => {
    const [gameSocket, setGameSocket] = useState<Socket<
        IGameServerToClientEvents,
        IGameClientToServerEvents
    > | null>(null);
    const [isGConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io(`${SOCKET_URL}${ESOCKET_NAMESPACE.game}`, {
            withCredentials: true,
            autoConnect: true,
        })

        socketInstance.on('connect', () => {
            console.log("🚀 ~ socketInstance.on ~ connect:")
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setGameSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return { gameSocket, isGConnected };
};