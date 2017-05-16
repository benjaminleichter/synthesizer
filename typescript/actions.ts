import { ActionCreatorsMapObject } from 'redux';

import { IAction } from './models/IAction';
import { Oscillator } from './models/classes/Oscillator';

export const ActionTypes = {
    SET_SYNTHESIZER_FREQUENCY_BY_ID: 'SET_SYNTHESIZER_FREQUENCY_BY_ID',
    SET_SYNTHESIZER_ATTACK_BY_ID: 'SET_SYNTHESIZER_ATTACK_BY_ID',
    SET_SYNTHESIZER_DECAY_BY_ID: 'SET_SYNTHESIZER_DECAY_BY_ID',
    SET_SYNTHESIZER_SUSTAIN_BY_ID: 'SET_SYNTHESIZER_SUSTAIN_BY_ID',
    SET_SYNTHESIZER_RELEASE_BY_ID: 'SET_SYNTHESIZER_RELEASE_BY_ID',
}

export namespace ActionInterfaces {
    export interface ISetSynthesizerFrequencyByIdAction extends IAction {
        payload : {
            id : string,
            frequency : number,
        }
    };
    export type ISetSynthesizerFrequencyByIdActionCreator = (id : string, frequency : number) => ISetSynthesizerFrequencyByIdAction;

    export interface ISetSynthesizerEnvelopeValueByIdAction extends IAction {
        payload : {
            id : string,
            value : number,
        }
    };
    export type ISetSynthesizerEnvelopeValueByIdActionCreator = (id : string, value : number) => ISetSynthesizerEnvelopeValueByIdAction;

    export interface IActionCreators extends ActionCreatorsMapObject {
        setSynthesizerFrequencyById : ISetSynthesizerFrequencyByIdActionCreator,
        setSynthesizerAttackById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerDecayById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerSustainById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerReleaseById : ISetSynthesizerEnvelopeValueByIdActionCreator,
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
});

const setSynthesizerAttackById : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdActionCreator = (
    id : string,
    value : number
) : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction => ({
    payload:{
        id,
        value
    },
    type: ActionTypes.SET_SYNTHESIZER_ATTACK_BY_ID
});

const setSynthesizerDecayById : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdActionCreator = (
    id : string,
    value : number
) : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction => ({
    payload: {
        id,
        value
    },
    type: ActionTypes.SET_SYNTHESIZER_DECAY_BY_ID
});

const setSynthesizerSustainById : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdActionCreator = (
    id : string,
    value : number
) : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction => ({
    payload: {
        id,
        value
    },
    type: ActionTypes.SET_SYNTHESIZER_SUSTAIN_BY_ID
});

const setSynthesizerReleaseById : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdActionCreator = (
    id : string,
    value : number
) : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction => ({
    payload: {
        id,
        value
    },
    type: ActionTypes.SET_SYNTHESIZER_RELEASE_BY_ID
});

export const ActionCreators : ActionInterfaces.IActionCreators = {
    setSynthesizerFrequencyById,
    setSynthesizerAttackById,
    setSynthesizerDecayById,
    setSynthesizerSustainById,
    setSynthesizerReleaseById
};
