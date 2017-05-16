import { ActionCreatorsMapObject } from 'redux';

import { IAction } from './models/IAction';
import { Oscillator } from './models/classes/Oscillator';

export const ActionTypes = {
    SET_SYNTHESIZER_ATTACK_BY_ID: 'SET_SYNTHESIZER_ATTACK_BY_ID',
    SET_SYNTHESIZER_DECAY_BY_ID: 'SET_SYNTHESIZER_DECAY_BY_ID',
    SET_SYNTHESIZER_SUSTAIN_BY_ID: 'SET_SYNTHESIZER_SUSTAIN_BY_ID',
    SET_SYNTHESIZER_RELEASE_BY_ID: 'SET_SYNTHESIZER_RELEASE_BY_ID',
}

export namespace ActionInterfaces {
    export interface ISetSynthesizerEnvelopeValueByIdAction extends IAction {
        payload : {
            id : string,
            value : number,
        }
    };
    export type ISetSynthesizerEnvelopeValueByIdActionCreator = (id : string, value : number) => ISetSynthesizerEnvelopeValueByIdAction;

    export interface IActionCreators extends ActionCreatorsMapObject {
        setSynthesizerAttackById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerDecayById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerSustainById : ISetSynthesizerEnvelopeValueByIdActionCreator,
        setSynthesizerReleaseById : ISetSynthesizerEnvelopeValueByIdActionCreator,
    }
}

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
    setSynthesizerAttackById,
    setSynthesizerDecayById,
    setSynthesizerSustainById,
    setSynthesizerReleaseById
};
