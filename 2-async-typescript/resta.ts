export class Resta {

    private minuendo: number;
    private sustraendo: number;
    
    constructor(a: number, b: number) {
       this.minuendo = a;
       this.sustraendo = b;
    }

    resultado = (): number => {
        return this.minuendo - this.sustraendo;
    }
}