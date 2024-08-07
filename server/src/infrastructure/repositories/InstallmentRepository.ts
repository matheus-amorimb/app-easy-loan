import IInstallmentRepository from "../../application/repositories/IInstallmentRepository";
import Installment from "../../domain/entities/Installment";
import DatabaseConnection from "../database/DatabaseConnection";

export default class InstallmentRepository implements IInstallmentRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getByLoanId(loanId: string) {
    const installments = await this.connection.query(
      "SELECT * FROM appeasyloan.installment WHERE loan_id = $1 ORDER BY due_date ASC",
      [loanId]
    );
    if (!installments) return;
    return installments.map((installment: any) =>
      Installment.restore(
        installment.id,
        installment.loan_id,
        parseFloat(installment.number),
        parseFloat(installment.outstanding_balance),
        parseFloat(installment.interest),
        parseFloat(installment.adjusted_outstanding_balance),
        parseFloat(installment.amount),
        installment.due_date
      )
    );
  }

  async save(installment: Installment): Promise<void> {
    await this.connection.query(
      "INSERT INTO appeasyloan.installment (id, loan_id, number, outstanding_balance, interest, adjusted_outstanding_balance, amount, due_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        installment.id,
        installment.loanId,
        installment.number,
        installment.outstandingBalance,
        installment.interest,
        installment.adjustedOutstandingBalance,
        installment.amount,
        installment.dueData,
      ]
    );
  }

  async deleteAll() {
    await this.connection.query("DELETE FROM appeasyloan.installment", []);
  }
}
