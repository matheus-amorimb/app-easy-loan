import User from "../../../domain/entities/User";
import { SignUpInput } from "../../dtos/auth/SignUpInput";
import { SignUpOutput } from "../../dtos/auth/SignUpOutput";
import IUserRepository from "../../repositories/IUserRepository";
import UseCase from "../UseCase";
import jwt from "jsonwebtoken";
import config from "../../../../config";

export default class SignUp implements UseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async execute(input: SignUpInput): Promise<SignUpOutput> {
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

    if (!config.JWT_SECRET) throw new Error("JWT Secret not defined");

    const token = jwt.sign(
      {
        email: user.email,
      },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      tokenJwt: token,
      expireTimeInMin: 60,
    };
  }
}
