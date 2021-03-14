import qs from 'qs';

export const getApiUrl = (path: string, params?: Record<string, unknown>) =>
    `http://training-assistant-app.herokuapp.com${path}?${params ? qs.stringify(params) : ''}`;
