import User from "../../domain/entities/User";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";

export default interface IUserRepository {
  connection: DatabaseConnection;
  isEmailInUse(email: string): Promise<boolean>;
  isCpfInUse(cpf: string): Promise<boolean>;
  getByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
