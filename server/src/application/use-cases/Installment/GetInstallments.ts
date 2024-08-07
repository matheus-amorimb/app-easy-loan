import Installment from "../../../domain/entities/Installment";
import GetInstallmentsInput from "../../dtos/installment/GetInstallmentsInput";
import GetInstallmentsOutput from "../../dtos/installment/GetInstallmentsOutput";
import IInstallmentRepository from "../../repositories/IInstallmentRepository";
import UseCase from "./../UseCase";

export default class GetInstallments implements UseCase {
  constructor(readonly installmentRepository: IInstallmentRepository) {}

  async execute(input: GetInstallmentsInput): Promise<GetInstallmentsOutput[]> {
    const installments = await this.installmentRepository.getByLoanId(
      input.loanId
    );
    if (!installments) throw new Error("Installments not found for loan id.");
    return installments.map((installment: Installment) => {
      return {
        id: installment.id,
        loanId: installment.loanId,
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
