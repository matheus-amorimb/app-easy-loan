import Birthdate from "../value-objects/Birthdate";
import Password from "../value-objects/Password";

export default class User {
  birthdate!: Birthdate;
  password!: Password;

  private constructor(
    readonly id: string,
    readonly fullName: string,
    readonly cpf: string,
    readonly email: string,
    password: string,
    isPasswordHash: boolean,
    birthdate: Date,
    readonly uf: string
  ) {
    this.password = new Password(password, isPasswordHash);
    this.birthdate = new Birthdate(birthdate);
  }

  static create(
    fullName: string,
    cpf: string,
    email: string,
    password: string,
    birthdate: Date,
    uf: string
  ) {
    const id = crypto.randomUUID();
    validateEmail(email);
    return new User(id, fullName, cpf, email, password, false, birthdate, uf);
  }

  static restore(
    id: string,
    fullName: string,
    cpf: string,
    email: string,
    password: string,
    birthdate: Date,
    uf: string
  ) {
    return new User(id, fullName, cpf, email, password, true, birthdate, uf);
  }
}

function validateEmail(email: string): void {
  if (!email.match(/^(.)+@(.)+$/)) throw new Error("Invalid email");
}

function validatePassword(password: string): void {
  if (password.length < 6)
    throw new Error("Password length must be 6 at minimun");
}
