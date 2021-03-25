import {getApiUrl} from '@/utils/getApiUrl';
import {request, ResponseType} from '@/utils/request';

import {ExcerciseDto} from './dto';


export const getRandomExcercise = (usedIds: number[]): Promise<ResponseType<ExcerciseDto>> =>
    request(getApiUrl('/api/exercise/random', {usedIds: usedIds.join(',')}));
