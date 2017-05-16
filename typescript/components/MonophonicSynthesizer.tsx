import * as React from 'react';

import { Oscillator } from '../models/classes/Oscillator';
import { IMonophonicSynthesizer } from '../models/interfaces/IMonophonicSynthesizer';

export interface IMonophonicSynthesizerProps extends IMonophonicSynthesizer {
    setAttack : (value : number) => void;
    setDecay : (value : number) => void;
    setSustain : (value : number) => void;
    setRelease : (value : number) => void;
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

        this.handleNoteOn = this.handleNoteOn.bind(this);
        this.handleNoteOff = this.handleNoteOff.bind(this);
        this.handleChangeAttackValue = this.handleChangeAttackValue.bind(this);
        this.handleChangeDecayValue = this.handleChangeDecayValue.bind(this);
        this.handleChangeSustainValue = this.handleChangeSustainValue.bind(this);
        this.handleChangeReleaseValue = this.handleChangeReleaseValue.bind(this);
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
        const { envelope } = this.props;
        const frequency = this.props.oscillator.getFrequency();

        const keyElements : Array<JSX.Element> = [];
        for (let i = 0; i < 12; i++) {
            keyElements.push((
                <button
                    key={ i }
                    onMouseDown={ () => this.handleNoteOn(i) }
                    onMouseUp={ this.handleNoteOff }
                />
            ))
        }
        return (
            <div className="oscillator">
                <div className="synth-control-group">
                    <p className="control-group-title">Envelope</p>
                    <div className="synth-control">
                        <label htmlFor="attack-input">Attack</label>
                        <input
                            id="attack-input"
                            type="range"
                            min="0"
                            max="100"
                            value={ envelope.getAttack() * 100 }
                            onChange={ this.handleChangeAttackValue }
                        />
                        <span className="control-value">{ `${ envelope.getAttack() }` }</span>
                    </div>
                    <div className="synth-control">
                        <label htmlFor="decay-input">Decay</label>
                        <input
                            id="decay-input"
                            type="range"
                            min="0"
                            max="100"
                            value={ envelope.getDecay() * 100 }
                            onChange={ this.handleChangeDecayValue }
                        />
                        <span className="control-value">{ `${ envelope.getDecay() }` }</span>
                    </div>
                    <div className="synth-control">
                        <label htmlFor="sustain-input">Sustain</label>
                        <input
                            id="sustain-input"
                            type="range"
                            min="0"
                            max="100"
                            value={ envelope.getSustain() * 100 }
                            onChange={ this.handleChangeSustainValue }
                        />
                        <span className="control-value">{ `${ envelope.getSustain() }` }</span>
                    </div>
                    <div className="synth-control">
                        <label htmlFor="release-input">Release</label>
                        <input
                            id="release-input"
                            type="range"
                            min="0"
                            max="100"
                            value={ envelope.getRelease() * 100 }
                            onChange={ this.handleChangeReleaseValue }
                        />
                        <span className="control-value">{ `${ envelope.getRelease() }` }</span>
                    </div>
                </div>
                <div className="keys">
                    { keyElements }
                </div>
            </div>
        )
    }

    private handleChangeAttackValue(event : React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value, 10) / 100;
        this.props.setAttack(value);
    }

    private handleChangeDecayValue(event : React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value, 10) / 100;
        this.props.setDecay(value);
    }

    private handleChangeSustainValue(event : React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value, 10) / 100;
        this.props.setSustain(value);
    }

    private handleChangeReleaseValue(event : React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value, 10) / 100;
        this.props.setRelease(value);
    }

    private handleNoteOn(note : number) {
        const now = this.audioContext.currentTime;
        const carrierGain = this.state.carrierGain;
        const envelope = this.props.envelope;

        const frequency = 440 * Math.pow(Math.pow(2, 1/12), note);
        this.state.carrier.frequency.linearRampToValueAtTime(frequency, now);

        carrierGain.gain.cancelScheduledValues(0);
        carrierGain.gain.setValueAtTime(carrierGain.gain.value, now);


        carrierGain.gain.linearRampToValueAtTime(1, now + envelope.getAttack());
        carrierGain.gain.linearRampToValueAtTime(envelope.getSustain(), now + envelope.getAttack() + envelope.getDecay());

        this.setState({ carrierGain });
    }
    private handleNoteOff() {
        const now = this.audioContext.currentTime;
        const carrierGain = this.state.carrierGain;
        const envelope = this.props.envelope;

        carrierGain.gain.cancelScheduledValues(0);
        carrierGain.gain.setValueAtTime(carrierGain.gain.value, now);

        carrierGain.gain.linearRampToValueAtTime(0, now + envelope.getRelease());

        this.setState({ carrierGain });
    }
}
