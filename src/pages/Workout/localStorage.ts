import {action, computed, makeObservable, observable} from 'mobx';

import {AssistantApiInterface} from '@/domain/assistant/types';
import {getRandomExcercise} from '@/services/http/excercise';
import {assistantApi} from '@/domain/assistant';
import {Excercise, ExcerciseSession} from '@/domain/excercise/types';
import {excercisesStore} from '@/domain/excercise/store';

class TrainPageStorageBase {
    private currentSessionTimer: NodeJS.Timer | undefined;

    @observable
    currentSession: ExcerciseSession | undefined = undefined;

    @observable
    private _excercises: number[] = [];

    @observable
    isExcerciseGettingInProgress = false;

    constructor(
        private readonly _assistant: AssistantApiInterface,
    ) {
        makeObservable(this);

        this.startWorkout();
        this.addExcercise();

        this._assistant.subscribe('ADD_EXCERCISE', this.addExcercise);
        this._assistant.subscribe('SKIP_EXCERCISE', this.skipExcercise);
        // eslint-disable-next-line no-console
        this._assistant.subscribe('FINISH_WORKOUT', console.log);
    }

    @computed
    get excercises(): number[] {
        return [...this._excercises];
    }

    @action
    setSession = (session: ExcerciseSession) =>
        this.currentSession = session;

    @action
    resetSession = () =>
        this.currentSession = undefined;

    @action
    startWorkout = () =>
        this._assistant.fire('START_WORKOUT');

    @action
    finishWorkout = () =>
        this._assistant.fire('QUIT_WORKOUT');

    @action
    private startSession = (excercise: Excercise) => {
        const {id, duration, description} = excercise;
        const startTimeMS = Date.now();

        this.currentSessionTimer && clearTimeout(this.currentSessionTimer);
        this.currentSessionTimer = setTimeout(() => {
            this.startNextExcercise();
        }, duration);

        this.setSession({
            id,
            start: startTimeMS,
            end: startTimeMS + duration,
        });

        this._assistant.say(`Новое упражнение: ${description}`);
    }

    @action
    startNextExcercise = () => {
        if (this._excercises.length === 0) {
            this._assistant.say('Упражнения закончились, добавьте новое');
            this.resetSession();
            return;
        }

        const excerciseId = this._excercises.shift();
        const excercise = excercisesStore.getExcerciseById(excerciseId as number);

        if (!excercise) {
            throw new Error('Ошибка при начале нового упражнения');
        } else {
            this.startSession(excercise);
        }
    }

    @action
    private skipExcercise = async () => {
        if (this.currentSession) {
            if (this._excercises.length !== 0) {
                // ts не понимает, что тут всегда будет элемент
                const newExcerciseId = this._excercises.shift() as number;
                const excercise = excercisesStore.getExcerciseById(newExcerciseId);

                if (!excercise) {
                    this._assistant.say('Не удалось восстановить упражнение');
                    throw new Error(`Упражнения с id ${newExcerciseId} не существует`);
                }

                this.startSession(excercise);
            } else {
                this._assistant.say('Это упражнение единственное, и его нельзя пропустить');
            }
        } else {
            this._assistant.say('Нет упражнений, которые можно удалить');
        }
    }

    @action
    private addExcercise = async () => {
        this.isExcerciseGettingInProgress = true;

        const res = await getRandomExcercise([]);

        if (res.ok) {
            const {data: excerciseRaw} = res;
            const excercise = {...excerciseRaw, duration: 10000};

            excercisesStore.addExcercise(excercise);

            if (!this.currentSession) {
                this.startSession(excercise);
            } else {
                this._excercises.push(excercise.id);
            }
        } else {
            this._assistant.say('Не удалось добавить упражнение, попробуйте позже');
        }

        this.isExcerciseGettingInProgress = false;
    }
}

export const TrainPageStorage = TrainPageStorageBase.bind(TrainPageStorageBase, assistantApi);

export const trainPageStore = new TrainPageStorage();
