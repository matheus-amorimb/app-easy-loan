import { Loan } from "../../domain/entities/Loan";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";

export default interface ILoanRepository {
  connection: DatabaseConnection;
  getAll(): Promise<Loan[]>;
  getById(loanId: string): Promise<Loan | undefined>;
  save(loan: Loan): Promise<void>;
}
