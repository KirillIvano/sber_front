import qs from 'qs';

import {HTTP_API_ORIGIN} from '@/settings';


export const getApiUrl = (path: string, params?: Record<string, unknown>) =>
    `${HTTP_API_ORIGIN}${path}?${params ? qs.stringify(params) : ''}`;
