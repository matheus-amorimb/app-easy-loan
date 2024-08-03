import { Loan } from "../../src/domain/entities/Loan";
import { FederativeUnit } from "../../src/domain/types/FederativeUnit.type";

export default class LoanBuilder {
  userCpf: string = "14863335750";
  userUf: FederativeUnit = "MG";
  userBirthdate: Date = new Date("18/06/1998");
  total: number = 100000;
  monthlyInstallment: number = 15000;

  static New(): LoanBuilder {
    return new LoanBuilder();
  }

  public WithFederativeUnit(value: FederativeUnit): LoanBuilder {
    this.userUf = value;
    return this;
  }

  public WithUserBirthDate(userBirthdate: Date): LoanBuilder {
    this.userBirthdate = userBirthdate;
    return this;
  }

  public WithTotal(value: number): LoanBuilder {
    this.total = value;
    return this;
  }

  public WithMonthlyInstallment(value: number): LoanBuilder {
    this.monthlyInstallment = value;
    return this;
  }

  public Build() {
    return new Loan(
      this.userCpf,
      this.userUf,
      this.userBirthdate,
      this.total,
      this.monthlyInstallment
    );
  }
}
