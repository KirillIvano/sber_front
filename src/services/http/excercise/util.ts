import {Excercise} from '@/domain/excercise/types';
import {ExcerciseDto} from './dto';

export const clientifyExcercise = (excercise: ExcerciseDto): Excercise => excercise;
