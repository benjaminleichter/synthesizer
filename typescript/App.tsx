import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Envelope } from './models/classes/Envelope';
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
        this.handleSetSynthesizerAttackById = this.handleSetSynthesizerAttackById.bind(this);
        this.handleSetSynthesizerDecayById = this.handleSetSynthesizerDecayById.bind(this);
        this.handleSetSynthesizerSustainById = this.handleSetSynthesizerSustainById.bind(this);
        this.handleSetSynthesizerReleaseById = this.handleSetSynthesizerReleaseById.bind(this);
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

                const envelope = new Envelope(
                    synthesizer.envelope.getAttack(),
                    synthesizer.envelope.getDecay(),
                    synthesizer.envelope.getSustain(),
                    synthesizer.envelope.getRelease());

                const setCarrierFrequency = (frequency : number) => this.handleSetSynthesizerFrequencyById(id, frequency);
                const setAttack = (value : number) => this.handleSetSynthesizerAttackById(id, value);
                const setDecay = (value : number) => this.handleSetSynthesizerDecayById(id, value);
                const setSustain = (value : number) => this.handleSetSynthesizerSustainById(id, value);
                const setRelease = (value : number) => this.handleSetSynthesizerReleaseById(id, value);
                return (
                    <MonophonicSynthesizer
                        key={ id }
                        envelope={ envelope }
                        gain={ synthesizer.gain }
                        modulationDepth={ synthesizer.modulationDepth }
                        oscillator={ oscillator }
                        octave={ synthesizer.octave }
                        setAttack={ setAttack }
                        setDecay={ setDecay }
                        setSustain={ setSustain }
                        setRelease={ setRelease }
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
    private handleSetSynthesizerAttackById(id : string, value : number) {
        this.props.dispatch(ActionCreators.setSynthesizerAttackById(id, value));
    }
    private handleSetSynthesizerDecayById(id : string, value : number) {
        this.props.dispatch(ActionCreators.setSynthesizerDecayById(id, value));
    }
    private handleSetSynthesizerSustainById(id : string, value : number) {
        this.props.dispatch(ActionCreators.setSynthesizerSustainById(id, value));
    }
    private handleSetSynthesizerReleaseById(id : string, value : number) {
        this.props.dispatch(ActionCreators.setSynthesizerReleaseById(id, value));
    }
}
const mapStateToProps = (state : {appState : IApp}) => ({
    synthesizersById: state.appState.synthesizersById
});
export const ConnectedApp = connect<{}, {}, {}>(mapStateToProps)(App);
