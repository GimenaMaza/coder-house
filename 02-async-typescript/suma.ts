export default class Suma {

    private sumando1: number;
    private sumando2: number;
    

    constructor(a: number, b: number) {
       this.sumando1 = a;
       this.sumando2 = b;
 
    }

    resultado = (): number =>{
        return this.sumando1 + this.sumando2;
    }
}