import config from "../../../../config";
import { SignInInput } from "../../dtos/auth/SIgnInInput";
import { SignInOutput } from "../../dtos/auth/SignInOutput";
import IUserRepository from "../../repositories/IUserRepository";
import UseCase from "../UseCase";
import jwt from "jsonwebtoken";

export default class SignIn implements UseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async execute(input: SignInInput): Promise<SignInOutput> {
    const user = await this.userRepository.getByEmail(input.email);

    if (!user) throw new Error("User not found.");

    if (!user.password.verify(input.password))
      throw new Error("Password is incorrect");

    if (!config.JWT_SECRET) throw new Error("JWT Secret is not defined");

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
