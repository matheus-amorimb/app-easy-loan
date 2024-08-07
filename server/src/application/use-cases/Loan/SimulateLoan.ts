import { Loan } from "../../../domain/entities/Loan";
import CalculateInstallements from "../../../domain/services/CalculateInstallments";
import SimulateLoanInput from "../../dtos/loan/SimulateLoanInput";
import SimulateLoanOutput from "../../dtos/loan/SimulateLoanOutput";
import UseCase from "./../UseCase";
import UserRepository from "../../../infrastructure/repositories/UserRepository";

export default class SimulateLoan implements UseCase {
  constructor(readonly userRepository: UserRepository) {}

  async execute(input: SimulateLoanInput): Promise<SimulateLoanOutput[]> {
    const user = await this.userRepository.getByEmail(input.userEmail);

    if (!user) throw new Error("User not found.");

    const loan = Loan.create(
      user.cpf,
      user.uf,
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
