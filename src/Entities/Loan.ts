export class Loan{
    id?: number; 

    constructor(readonly userCpf: string, readonly userUf: string, readonly userBirthday: string, readonly total: number, readonly monthlyValue: number){
    }

}