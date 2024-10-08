import { Loan } from "../../src/domain/entities/Loan";
import { FederativeUnit } from "../../src/domain/types/FederativeUnit.type";
import Birthdate from "../../src/domain/value-objects/Birthdate";

export default class LoanBuilder {
  userCpf: string = "14863335750";
  userUf: string = "MG";
  userBirthdate: Date = new Date("1998-06-18T00:00:00");
  total: number = 60000;
  monthlyInstallment: number = 15000;

  static new(): LoanBuilder {
    return new LoanBuilder();
  }

  public withFederativeUnit(value: FederativeUnit): LoanBuilder {
    this.userUf = value;
    return this;
  }

  public withUserBirthDate(userBirthdate: Date): LoanBuilder {
    this.userBirthdate = userBirthdate;
    return this;
  }

  public withTotal(value: number): LoanBuilder {
    this.total = value;
    return this;
  }

  public withMonthlyInstallment(value: number): LoanBuilder {
    this.monthlyInstallment = value;
    return this;
  }

  public build() {
    return Loan.create(
      this.userCpf,
      this.userUf,
      this.total,
      this.monthlyInstallment
    );
  }
}
