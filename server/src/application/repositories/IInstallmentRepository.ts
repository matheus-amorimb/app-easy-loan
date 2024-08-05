import Installment from "../../domain/entities/Installment";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";

export default interface IInstallmentRepository {
  connection: DatabaseConnection;
  getByLoanId(loanId: string): Promise<Installment[]> | undefined;
  save(installment: Installment): Promise<void>;
}
