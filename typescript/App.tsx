import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Oscillator } from './models/classes/Oscillator';
import { IMonophonicSynthesizer } from './models/interfaces/IMonophonicSynthesizer';

import { MonophonicSynthesizer } from './components/MonophonicSynthesizer';

import { ActionCreators, ActionInterfaces } from './actions';

export interface IApp {
    synthesizersById : {[id : string] : IMonophonicSynthesizer | null};
};
export interface IConnectedApp extends IApp {
    dispatch : Dispatch<{}>
}
export class App extends React.Component<IConnectedApp, {}> {
    constructor() {
        super();

        this.handleSetSynthesizerFrequencyById = this.handleSetSynthesizerFrequencyById.bind(this);
    }
    public render() {
        const { synthesizersById } = this.props;
        const oscillatorElements = Object.keys(synthesizersById).map((id : string) => {
            const synthesizer : IMonophonicSynthesizer | null = synthesizersById[id];
            if (synthesizer !== null) {
                const oscillator = new Oscillator(
                    synthesizer.oscillator.getFrequency(),
                    synthesizer.oscillator.getGainModulationRate(),
                    synthesizer.oscillator.getWaveform());
                
                const setCarrierFrequency = (frequency : number) => this.handleSetSynthesizerFrequencyById(id, frequency);
                return (
                    <MonophonicSynthesizer
                        key={ id }
                        gain={ synthesizer.gain }
                        modulationDepth={ synthesizer.modulationDepth }
                        oscillator={ oscillator }
                        setCarrierFrequency={ setCarrierFrequency }
                    />
                )
            }
        });
        return (
            <div className="base-app">
                { oscillatorElements }
            </div>
        );
    }
    private handleSetSynthesizerFrequencyById(id : string, frequency : number) {
        this.props.dispatch(ActionCreators.setSynthesizerFrequencyById(id, frequency));
    }
}
const mapStateToProps = (state : {appState : IApp}) => ({
    synthesizersById: state.appState.synthesizersById
});
export const ConnectedApp = connect<{}, {}, {}>(mapStateToProps)(App);
