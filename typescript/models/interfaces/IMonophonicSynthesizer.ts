import { Oscillator } from '../classes/Oscillator';

export interface IMonophonicSynthesizer {
    gain : number;
    modulationDepth : number;
    oscillator : Oscillator;
}