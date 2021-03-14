import {request} from './../request';

const mockFetch = (
    data: Record<string, unknown>,
    status: number,
    ok: boolean,
) => {
    global.fetch = jest.fn(() => (
        {
            json: () => Promise.resolve(data),
            status,
            ok,
        }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;
};

describe('Функция request для работы с http', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Возвращает корректный ответ, если запрос успешен', async () => {
        mockFetch({data: {name: 'string'}}, 200, true);

        const res = await request('');

        expect(res.status).toBe(200);
        expect(res.ok).toBe(true);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((res as any).data).toEqual({name: 'string'});
    });

    it('Возвращает ошибку, если запрос завершился неудачей', async () => {
        mockFetch({error: 'error'}, 500, false);

        const res = await request('');

        expect(res.ok).toEqual(false);
        expect(res.status).toEqual(500);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((res as any).error).toEqual('error');
    });
});
