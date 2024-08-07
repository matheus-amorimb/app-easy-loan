import ILoanRepository from "../../application/repositories/ILoanRepository";
import { Loan } from "../../domain/entities/Loan";
import DatabaseConnection from "../database/DatabaseConnection";

export default class LoanRepository implements ILoanRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getAll(): Promise<Loan[]> {
    const loans = await this.connection.query(
      "SELECT * FROM easyloan.loan ORDER BY date",
      []
    );

    return loans?.map((loan: any) => {
      return Loan.restore(
        loan.id,
        loan.user_cpf,
        loan.user_uf,
        parseFloat(loan.total),
        parseFloat(loan.monthly_installment),
        loan.date
      );
    });
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
      parseFloat(loan.total),
      parseFloat(loan.monthly_installment),
      loan.date
    );
  }

  async getByUser(cpf: string): Promise<Loan[] | undefined> {
    const loans = await this.connection.query(
      "SELECT * FROM easyloan.loan WHERE user_cpf = $1 ORDER BY date DESC",
      [cpf]
    );
    return loans?.map((loan: any) => {
      return Loan.restore(
        loan.id,
        loan.user_cpf,
        loan.user_uf,
        parseFloat(loan.total),
        parseFloat(loan.monthly_installment),
        loan.date
      );
    });
  }

  async save(loan: Loan) {
    await this.connection.query(
      "INSERT INTO easyloan.loan (id, user_cpf, user_uf, total, monthly_installment, date) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        loan.id,
        loan.userCpf,
        loan.userUf,
        loan.total,
        loan.monthlyInstallment,
        loan.date,
      ]
    );
  }

  async deleteAll() {
    await this.connection.query("DELETE FROM easyloan.loan", []);
  }
}
