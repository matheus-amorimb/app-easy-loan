import { Loan } from "../../domain/entities/Loan";
import CalculateInstallements from "../../domain/services/CalculateInstallments";
import ApplyForLoanInput from "../dtos/loan/ApplyForLoanInput";
import ApplyForLoanOutput from "../dtos/loan/ApplyForLoanOutput";
import IInstallmentRepository from "../repositories/IInstallmentRepository";
import ILoanRepository from "../repositories/ILoanRepository";
import UseCase from "./UseCase";

export default class ApplyForLoan implements UseCase {
  constructor(
    readonly loanRepository: ILoanRepository,
    readonly installmentRepository: IInstallmentRepository
  ) {}

  async execute(input: ApplyForLoanInput): Promise<ApplyForLoanOutput> {
    const loan = Loan.create(
      input.userCpf,
      input.userUf,
      input.userBirthdate,
      input.total,
      input.monthlyInstallment
    );
    const installments = CalculateInstallements.calculate(loan);

    try {
      await this.loanRepository.save(loan);
      installments.forEach(
        async (installment) =>
          await this.installmentRepository.save(installment)
      );
    } catch (error) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to apply for loan");
    }
    return {
      loanId: loan.id,
    };
  }
}
