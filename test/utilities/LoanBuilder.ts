import { Loan } from '../../src/Entities/Loan';

export default class LoanBuilder{
    userCpf: string = '14863335750';
    userUf: string = 'MG';
    userBirthday: string = '18/06/1998';
    total: number = 100000;
    monthlyValue: number = 15000;


    static New(): LoanBuilder{
        return new LoanBuilder();
    }

    public WithTotal(value: number): LoanBuilder{
        this.total = value;
        return this;
    }

    public Build(){
        return new Loan(this.userCpf, this.userUf, this.userBirthday, this.total, this.monthlyValue)
    }

}