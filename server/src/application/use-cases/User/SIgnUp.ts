import User from "../../../domain/entities/User";
import { signUpInput } from "../../dtos/auth/SignUpInput";
import { SignUpOutput } from "../../dtos/auth/SignUpOutput";
import IUserRepository from "../../repositories/IUserRepository";
import UseCase from "../UseCase";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "L2qG5x7D9fJb3V@8eP9jT2mU!wX&3RzQ%1pHkL0Y6vN5oK4sJxA7eB@8yW2hS";

export default class SignUp implements UseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async execute(input: signUpInput): Promise<SignUpOutput> {
    if (input.password !== input.confirmPassword)
      throw new Error("Passwords do not match.");

    const isEmailInUse = await this.userRepository.isEmailInUse(input.email);
    if (isEmailInUse) throw new Error("Email already in use.");

    const isCpfInUse = await this.userRepository.isCpfInUse(input.cpf);
    if (isCpfInUse) throw new Error("Cpf already in use.");

    const user = User.create(
      input.fullName,
      input.cpf,
      input.email,
      input.password,
      input.birthdate,
      input.uf
    );

    await this.userRepository.save(user);

    const token = jwt.sign(
      {
        emai: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      tokenJwt: token,
      expireTimeInMin: 60,
    };
  }
}
