import {computed, observable, makeObservable, action} from 'mobx';

import {Excercise} from './types';


class ExcercisesStore {
    @observable
    private _excercises = new Map<number, Excercise>();

    @computed
    get excercises() {
        return [...this._excercises.values()];
    }

    constructor() {
        makeObservable(this);
    }

    @action
    addExcercise(excercise: Excercise) {
        this._excercises.set(excercise.id, excercise);
    }

    @action
    getExcerciseById(id: number): Excercise | undefined {
        return this._excercises.get(id);
    }
}

export const excercisesStore = new ExcercisesStore();
