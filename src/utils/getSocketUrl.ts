import {WS_API_ORIGIN} from '@/settings';


export const getSocketUrl = (path: string) =>
    `${WS_API_ORIGIN}${path}`;
