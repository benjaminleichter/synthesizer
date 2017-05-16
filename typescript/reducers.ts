import * as uuid from 'uuid';
import { IApp } from './App';
import { IMonophonicSynthesizerProps } from './components/MonophonicSynthesizer';
import { IAction } from './models/IAction';

import { Oscillator } from './models/classes/Oscillator';
import { Envelope } from './models/classes/Envelope';

import { ActionInterfaces, ActionTypes } from './actions';

const initialState : IApp = {
    synthesizersById: {
        '1': {
            envelope: new Envelope(1, 1, 0.5, 1),
            gain: 0.5,
            modulationDepth: 100,
            oscillator: new Oscillator(440, 0, 'sine'),
        },
    }
}

export const reduceSetSynthesizerFrequencyById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerFrequencyByIdAction,
) : IApp => {
    const newState = { ...state };
    const synthesizerId = action.payload.id;
    newState.synthesizersById = { ...newState.synthesizersById };

    const synthesizer = { ...newState.synthesizersById[synthesizerId] };
    if (synthesizer !== null) {
        synthesizer.oscillator = new Oscillator(
            action.payload.frequency,
            synthesizer.oscillator.getGainModulationRate(),
            synthesizer.oscillator.getWaveform());

        newState.synthesizersById[synthesizerId] = synthesizer;
    }
    return newState;
}

export const reduceSetSynthesizerAttackById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction
) : IApp => {
    const newState = { ...state };
    const synthesizerId = action.payload.id;

    newState.synthesizersById = { ...newState.synthesizersById };

    const synthesizer = { ...newState.synthesizersById[synthesizerId] };
    if (synthesizer !== null) {
        synthesizer.envelope = new Envelope(
            action.payload.value,
            synthesizer.envelope.getDecay(),
            synthesizer.envelope.getSustain(),
            synthesizer.envelope.getRelease());

        newState.synthesizersById[synthesizerId] = synthesizer;
    }
    return newState;
}

export const reduceSetSynthesizerDecayById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction
) : IApp => {
    const newState = { ...state };
    const synthesizerId = action.payload.id;

    newState.synthesizersById = { ...newState.synthesizersById };

    const synthesizer = { ...newState.synthesizersById[synthesizerId] };
    if (synthesizer !== null) {
        synthesizer.envelope = new Envelope(
            synthesizer.envelope.getAttack(),
            action.payload.value,
            synthesizer.envelope.getSustain(),
            synthesizer.envelope.getRelease());

        newState.synthesizersById[synthesizerId] = synthesizer;
    }
    return newState;
}

export const reduceSetSynthesizerSustainById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction
) : IApp => {
    const newState = { ...state };
    const synthesizerId = action.payload.id;

    newState.synthesizersById = { ...newState.synthesizersById };

    const synthesizer = { ...newState.synthesizersById[synthesizerId] };
    if (synthesizer !== null) {
        synthesizer.envelope = new Envelope(
            synthesizer.envelope.getAttack(),
            synthesizer.envelope.getDecay(),
            action.payload.value,
            synthesizer.envelope.getRelease());

        newState.synthesizersById[synthesizerId] = synthesizer;
    }
    return newState;
}

export const reduceSetSynthesizerReleaseById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction
) : IApp => {
    const newState = { ...state };
    const synthesizerId = action.payload.id;

    newState.synthesizersById = { ...newState.synthesizersById };

    const synthesizer = { ...newState.synthesizersById[synthesizerId] };
    if (synthesizer !== null) {
        synthesizer.envelope = new Envelope(
            synthesizer.envelope.getAttack(),
            synthesizer.envelope.getDecay(),
            synthesizer.envelope.getSustain(),
            action.payload.value)

        newState.synthesizersById[synthesizerId] = synthesizer;
    }
    return newState;
}

export const reducers = (state : IApp = initialState, action : IAction) => {
    switch (action.type) {
        case ActionTypes.SET_SYNTHESIZER_FREQUENCY_BY_ID:
            return reduceSetSynthesizerFrequencyById(
                state,
                action as ActionInterfaces.ISetSynthesizerFrequencyByIdAction
            );
        case ActionTypes.SET_SYNTHESIZER_ATTACK_BY_ID:
            return reduceSetSynthesizerAttackById(
                state,
                action as ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction)
        case ActionTypes.SET_SYNTHESIZER_DECAY_BY_ID:
            return reduceSetSynthesizerDecayById(
                state,
                action as ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction)
        case ActionTypes.SET_SYNTHESIZER_SUSTAIN_BY_ID:
            return reduceSetSynthesizerSustainById(
                state,
                action as ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction)
        case ActionTypes.SET_SYNTHESIZER_RELEASE_BY_ID:
            return reduceSetSynthesizerReleaseById(
                state,
                action as ActionInterfaces.ISetSynthesizerEnvelopeValueByIdAction)
        default:
            return state;
    }
}
