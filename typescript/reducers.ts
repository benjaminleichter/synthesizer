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
            oscillator: new Oscillator(440, 0.5, 'sine'),
        },
        // 2: {
        //     gain: 0,
        //     modulationDepth: 100,
        //     oscillator: new Oscillator(440, 0, 'sine'),
        // }
    }
}

export const reduceSetSynthesizerFrequencyById = (
    state : IApp,
    action : ActionInterfaces.ISetSynthesizerFrequencyByIdAction,
) : IApp => {
    const newState = { ...state };
    newState.synthesizersById = { ...newState.synthesizersById };
    const synthesizer = { ...newState.synthesizersById[action.payload.id] };
    if (synthesizer !== null) {
        synthesizer.oscillator = new Oscillator(
            action.payload.frequency,
            synthesizer.oscillator.getGainModulationRate(),
            synthesizer.oscillator.getWaveform());
        
        newState.synthesizersById[action.payload.id] = synthesizer;
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
        default:
            return state;
    }
}
