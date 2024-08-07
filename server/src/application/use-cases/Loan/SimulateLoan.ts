import { Loan } from "../../../domain/entities/Loan";
import CalculateInstallements from "../../../domain/services/CalculateInstallments";
import SimulateLoanInput from "../../dtos/loan/SimulateLoanInput";
import SimulateLoanOutput from "../../dtos/loan/SimulateLoanOutput";
import UseCase from "./../UseCase";

export default class SimulateLoan implements UseCase {
  async execute(input: SimulateLoanInput): Promise<SimulateLoanOutput[]> {
    const loan = Loan.create(
      input.userCpf,
      input.userUf,
      input.userBirthdate,
      input.total,
      input.monthlyInstallment
    );
    const installments = CalculateInstallements.calculate(loan);
    return await installments.map((installment) => {
      return {
        number: installment.number,
        outstandingBalance: installment.outstandingBalance,
        interest: installment.interest,
        adjustedOutstandingBalance: installment.adjustedOutstandingBalance,
        amount: installment.amount,
        dueData: installment.dueData,
      };
    });
  }
}
