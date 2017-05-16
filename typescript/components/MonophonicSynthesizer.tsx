import * as React from 'react';

import { Oscillator } from '../models/classes/Oscillator';
import { IMonophonicSynthesizer } from '../models/interfaces/IMonophonicSynthesizer';

export interface IMonophonicSynthesizerProps extends IMonophonicSynthesizer {
    setCarrierFrequency : (frequency : number) => void;
}
export interface IMonophonicSynthesizerState {
    carrier : OscillatorNode;
    modulator : OscillatorNode;
    carrierGain : GainNode;
    modulationGain : GainNode;
}
export class MonophonicSynthesizer extends React.Component<IMonophonicSynthesizerProps, IMonophonicSynthesizerState> {
    private carrier : OscillatorNode;
    private modulator : OscillatorNode;
    private carrierGain : GainNode;
    private modulationGain : GainNode;
    private audioContext : AudioContext;

    constructor() {
        super();

        this.audioContext = new AudioContext();
        this.carrier = this.audioContext.createOscillator();
        this.modulator = this.audioContext.createOscillator();
        this.carrierGain = this.audioContext.createGain();
        this.modulationGain = this.audioContext.createGain();

        this.state = {
            carrier: this.carrier,
            modulator: this.modulator,
            carrierGain: this.carrierGain,
            modulationGain: this.modulationGain
        };

        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
        this.handleNoteOn = this.handleNoteOn.bind(this);
        this.handleNoteOff = this.handleNoteOff.bind(this);
    }
    public componentWillMount() {
        const { gain, modulationDepth, oscillator } = this.props;

        // Set carrier values
        this.state.carrier.frequency.value = oscillator.getFrequency();
        this.state.carrier.type = oscillator.getWaveform();

        // Set modulator values
        this.state.modulator.frequency.value = oscillator.getGainModulationRate();
        this.state.modulator.type = 'sine';

        // set gain values
        this.state.modulationGain.gain.value = modulationDepth;
        this.state.carrierGain.gain.value = 0;

        // connect nodes
        this.state.modulator.connect(this.state.modulationGain);
        this.state.modulationGain.connect(this.state.carrier.detune);
        this.state.carrier.connect(this.carrierGain);
        this.state.carrierGain.connect(this.audioContext.destination);

        // start oscillators
        this.state.carrier.start(0);
        this.state.modulator.start(0);
    }
    public componentWillUnmount() {
        this.audioContext.close();
    }
    public render() {
        const frequency = this.props.oscillator.getFrequency();
        return (
            <div className="oscillator">
                { `${ frequency }hZ` }
                <input
                    type="range"
                    min="0"
                    max="1000"
                    onChange={ this.handleChangeFrequency }
                    value={ frequency }
                />
                <button
                    onMouseDown={ () => this.handleNoteOn(10, 10, 0.5) }
                    onMouseUp={ () => this.handleNoteOff(5) }
                />
            </div>
        )
    }
    private handleChangeFrequency(event : React.ChangeEvent<HTMLInputElement>) {
        const frequency = parseInt(event.target.value, 10);
        const carrier = this.state.carrier;
        carrier.frequency.value = frequency;

        this.setState({ carrier });
        this.props.setCarrierFrequency(frequency);
    }

    private handleNoteOn(attack : number, decay : number, sustain : number) {
        const now = this.audioContext.currentTime;
        const carrierGain = this.state.carrierGain;

        carrierGain.gain.cancelScheduledValues(0);
        carrierGain.gain.setValueAtTime(0, now);

        carrierGain.gain.linearRampToValueAtTime(1, now + attack);
        carrierGain.gain.linearRampToValueAtTime(sustain, now + attack + decay);

        this.setState({ carrierGain });
    }
    private handleNoteOff(release : number) {
        const now = this.audioContext.currentTime;
        const carrierGain = this.state.carrierGain;

        carrierGain.gain.cancelScheduledValues(0);
        carrierGain.gain.setValueAtTime(carrierGain.gain.value, now);

        carrierGain.gain.linearRampToValueAtTime(0, now + release);

        this.setState({ carrierGain });
    }
}
