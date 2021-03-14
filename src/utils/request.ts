export type ResponseType<TReturn extends Record<string, unknown>> = {
    data: TReturn;
    status: number;
    ok: true;
} | {
    error: string;
    status: number;
    ok: false;
}

type BodyType<TReturn extends Record<string, unknown>> =
    {data: TReturn} | {error: string};

const DEFAULT_ERROR = {
    error: 'Неизвестная ошибка',
    ok: false as const,
    status: 500,
};

export const request = async <TReturn extends Record<string, unknown>,>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<ResponseType<TReturn>> => {
    let body: BodyType<TReturn>;
    let res: Response;

    try {
        res = await fetch(url, options);
        body = await res.json();
    } catch(e) {
        return DEFAULT_ERROR;
    }

    const {ok, status} = res;

    if (!ok) {
        const {error} = body as {error: string};

        return {
            error: error || DEFAULT_ERROR.error,
            ok,
            status,
        };
    }

    return {
        data: (body as {data: TReturn}).data,
        ok,
        status,
    };
};
