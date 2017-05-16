import { Oscillator } from '../classes/Oscillator';
import { Envelope } from '../classes/Envelope';

export interface IMonophonicSynthesizer {
    envelope : Envelope;
    gain : number;
    modulationDepth : number;
    oscillator : Oscillator;
}