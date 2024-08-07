import { Loan } from "../../../domain/entities/Loan";
import Birthdate from "../../../domain/value-objects/Birthdate";
import GetLoanOutput from "../../dtos/loan/GetLoanOutput";
import ILoanRepository from "../../repositories/ILoanRepository";
import IUserRepository from "../../repositories/IUserRepository";
import UseCase from "./../UseCase";

export default class GetLoans implements UseCase {
  constructor(
    readonly userRepository: IUserRepository,
    readonly loanRepository: ILoanRepository
  ) {}

  async execute(userEmail: string): Promise<GetLoanOutput[]> {
    const user = await this.userRepository.getByEmail(userEmail);
    if (!user) throw new Error("User not found.");
    const loans = await this.loanRepository.getByUser(user.cpf);
    if (!loans) return [];
    return loans.map((loan: Loan) => {
      return {
        id: loan.id,
        userUf: loan.userUf,
        total: loan.total,
        monthlyInstallment: loan.monthlyInstallment,
        date: loan.date,
      };
    });
  }
}
