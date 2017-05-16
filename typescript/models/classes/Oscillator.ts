import { Waveform } from '../types/Waveform';

export class Oscillator {
    private frequency : number;
    private gainModulationRate : number;
    private waveform : Waveform;

    constructor(
        frequency : number,
        gainModulationRate : number,
        waveform : Waveform
    ) {
        this.frequency = frequency;
        this.gainModulationRate = gainModulationRate;
        this.waveform = waveform
    }

    public getFrequency() {
        return this.frequency;
    }
    public setFrequency(frequency : number) {
        this.frequency = frequency;
    }
    public getGainModulationRate() {
        return this.gainModulationRate;
    }
    public setGainModulationRate(modulationRate : number) {
        this.gainModulationRate = modulationRate;
    }
    public getWaveform() {
        return this.waveform;
    }
    public setWaveform(waveform : Waveform) {
        this.waveform = waveform;
    }
}
