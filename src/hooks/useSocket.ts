import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/constants/envConstants';
import { IChatClientToServerEvents, IChatServerToClientEvents } from '@/types/socket';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket<
        IChatServerToClientEvents,
        IChatClientToServerEvents
    > | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io(SOCKET_URL, {
            withCredentials: true,
            autoConnect: true,
        })

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return { socket, isConnected };
};