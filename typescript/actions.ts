import { ActionCreatorsMapObject } from 'redux';

import { IAction } from './models/IAction';
import { Oscillator } from './models/classes/Oscillator';

export const ActionTypes = {
    SET_SYNTHESIZER_FREQUENCY_BY_ID: 'SET_SYNTHESIZER_FREQUENCY_BY_ID',
}

export namespace ActionInterfaces {
    export interface ISetSynthesizerFrequencyByIdAction extends IAction {
        payload: {
            id : string,
            frequency : number,
        }
    };
    export type ISetSynthesizerFrequencyByIdActionCreator = (id : string, frequency : number) => ISetSynthesizerFrequencyByIdAction;

    export interface IActionCreators extends ActionCreatorsMapObject {
        setSynthesizerFrequencyById: ISetSynthesizerFrequencyByIdActionCreator
    }
}

const setSynthesizerFrequencyById : ActionInterfaces.ISetSynthesizerFrequencyByIdActionCreator = (
    id : string,
    frequency : number
) : ActionInterfaces.ISetSynthesizerFrequencyByIdAction => ({
    payload: {
        id,
        frequency
    },
    type: ActionTypes.SET_SYNTHESIZER_FREQUENCY_BY_ID
})

export const ActionCreators : ActionInterfaces.IActionCreators = {
    setSynthesizerFrequencyById
};
