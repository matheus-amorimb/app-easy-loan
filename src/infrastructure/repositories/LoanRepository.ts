import ILoanRepository from "../../application/repositories/ILoanRepository";
import { Loan } from "../../domain/entities/Loan";
import DatabaseConnection from "../database/DatabaseConnection";

export default class LoanRepository implements ILoanRepository {
  constructor(readonly connection: DatabaseConnection) {}

  getAll(): Promise<Loan[]> {
    throw new Error("Method not implemented.");
  }

  async getById(loanId: string) {
    const [loan] = await this.connection.query(
      "SELECT * FROM easyloan.loan WHERE id = $1",
      [loanId]
    );
    if (!loan) return;
    return Loan.restore(
      loan.id,
      loan.user_cpf,
      loan.user_uf,
      loan.user_birthdate,
      parseFloat(loan.total),
      parseFloat(loan.monthly_installment),
      loan.date
    );
  }

  async save(loan: Loan) {
    await this.connection.query(
      "INSERT INTO easyloan.loan (id, user_cpf, user_uf, user_birthdate, total, monthly_installment, date) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        loan.id,
        loan.userCpf,
        loan.userUf,
        loan.userBirthdate.value,
        loan.total,
        loan.monthlyInstallment,
        loan.date,
      ]
    );
  }
}
