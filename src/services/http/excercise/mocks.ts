import {ResponseType} from '@/utils/request';

import {ExcerciseDto} from './dto';

let lastRandomId = 0;

export const randomExcercisesMock = (): Promise<ResponseType<ExcerciseDto>> =>
    Promise.resolve({
        data: {
            id: ++lastRandomId,
            name: 'даб',
            description: 'степ',
            duration: 50000,
            muscleGroups: ['core', 'legs', 'arms'],
        },
        ok: true,
        status: 200,
    });
