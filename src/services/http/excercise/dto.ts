import {MuscleGroupType} from '@/domain/excercise/types';

export type ExcerciseDto = {
    id: number;
    name: string;
    description: string;
    duration: number;
    muscleGroups: MuscleGroupType[]
}
