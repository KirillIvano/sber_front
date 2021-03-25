export type MuscleGroupType = 'core' | 'arms' | 'legs';

export type Excercise = {
    id: number;
    name: string;
    description: string;
    duration: number;
    muscleGroups: MuscleGroupType[];
}

export type ExcerciseSession = {
    start: number;
    end: number;
    id: number;
}
