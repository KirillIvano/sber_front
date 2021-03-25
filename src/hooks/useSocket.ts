import {useEffect, useState} from 'react';

import {getSocketUrl} from '@/utils/getSocketUrl';

export type SocketState<TData> = {
    data?: TData,
    error?: string;
    connecting: boolean;
}

export const useSocketState = <TData,>(socketPath: string) => {
    const [data, setData] = useState<TData>();
    const [error, setError] = useState<string>();
    const [connecting, setConnecting] = useState<boolean>(true);

    useEffect(() => {
        const reset = () => {
            setData(undefined);
            setError(undefined);
            setConnecting(true);
        };

        const handleData = (newData: string) => {
            let parsedData: TData;

            try {
                parsedData = JSON.parse(newData) as TData;
            } catch {
                setError('Некорректный ответ сервера');
                return;
            }

            setData(parsedData);
        };

        const ws = new WebSocket(getSocketUrl(socketPath));

        ws.addEventListener('close', () => {
            reset();
        });

        ws.addEventListener('open', () => {
            setConnecting(false);
        });

        ws.addEventListener('error', () => setError('Неожиданная ошибка на сервере'));
        ws.addEventListener('message', ({data}) => handleData(data));

        return () => {
            ws.close();
        };
    }, [socketPath]);

    return {
        data,
        error,
        connecting,
    };
};
