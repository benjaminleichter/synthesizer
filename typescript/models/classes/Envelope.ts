export class Envelope {
    private attack : number;
    private decay : number;
    private sustain : number;
    private release : number;

    constructor(
        attack : number,
        decay : number,
        sustain : number,
        release : number,
    ) {
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
    }

    public getAttack() : number {
        return this.attack;
    }
    public getDecay() : number {
        return this.decay;
    }
    public getSustain() : number {
        return this.sustain;
    }
    public getRelease() : number {
        return this.release;
    }
}