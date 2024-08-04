import { Loan } from "../../src/domain/entities/Loan";
import { FederativeUnit } from "../../src/domain/types/FederativeUnit.type";
import Birthdate from "../../src/domain/value-objects/Birthdate";

export default class LoanBuilder {
  userCpf: string = "14863335750";
  userUf: FederativeUnit = "MG";
  userBirthdate: Birthdate = new Birthdate(new Date("1998-06-18T00:00:00"));
  total: number = 60000;
  monthlyInstallment: number = 15000;

  static New(): LoanBuilder {
    return new LoanBuilder();
  }

  public WithFederativeUnit(value: FederativeUnit): LoanBuilder {
    this.userUf = value;
    return this;
  }

  public WithUserBirthDate(userBirthdate: Birthdate): LoanBuilder {
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
