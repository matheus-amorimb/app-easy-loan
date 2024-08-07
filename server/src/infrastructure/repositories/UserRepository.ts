import IUserRepository from "../../application/repositories/IUserRepository";
import User from "../../domain/entities/User";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserRepository implements IUserRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async isEmailInUse(email: string): Promise<boolean> {
    const [result] = await this.connection.query(
      "SELECT COUNT(*) FROM easyloan.user WHERE email = $1",
      [email]
    );
    await this.connection.close();
    return result?.count !== "0";
  }

  async isCpfInUse(cpf: string): Promise<boolean> {
    const [result] = await this.connection.query(
      "SELECT COUNT(*) FROM easyloan.user WHERE cpf = $1",
      [cpf]
    );
    await this.connection.close();
    return result?.count !== "0";
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.connection.query(
      "SELECT * FROM easyloan.user WHERE email = $1",
      [email]
    );
    this.connection.close();
    if (!user) return;
    console.log(user);
    return User.restore(
      user.id,
      user.full_name,
      user.cpf,
      user.email,
      user.password,
      user.birthdate,
      user.uf
    );
  }

  async save(user: User): Promise<void> {
    await this.connection.query(
      "INSERT INTO easyloan.user(id, full_name, cpf, email, password, birthdate, uf) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        user.id,
        user.fullName,
        user.cpf,
        user.email,
        user.password.value,
        user.birthdate.value,
        user.uf,
      ]
    );
    await this.connection.close();
  }
}
