import Birthdate from "../../domain/value-objects/Birthdate";
import GetLoanOutput from "../dtos/loan/GetLoanOutput";
import ILoanRepository from "../repositories/ILoanRepository";
import UseCase from "./UseCase";

export default class GetLoans implements UseCase {
  constructor(readonly loanRepository: ILoanRepository) {}

  async execute(): Promise<GetLoanOutput[]> {
    const loans = await this.loanRepository.getAll();
    if (!loans) return [];
    console.log(loans);
    return loans.map((loan) => {
      return {
        id: loan.id,
        userCpf: loan.userCpf,
        userUf: loan.userUf,
        userBirthdate: new Birthdate(loan.userBirthdate?.value),
        total: loan.total,
        monthlyInstallment: loan.monthlyInstallment,
        date: loan.date,
      };
    });
  }
}
