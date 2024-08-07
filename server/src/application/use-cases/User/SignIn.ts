import { SignUpInput } from "../../dtos/auth/SIgnInInput";
import { SignInOutput } from "../../dtos/auth/SignInOutput";
import IUserRepository from "../../repositories/IUserRepository";
import UseCase from "../UseCase";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "L2qG5x7D9fJb3V@8eP9jT2mU!wX&3RzQ%1pHkL0Y6vN5oK4sJxA7eB@8yW2hS";

export default class SignIn implements UseCase {
  constructor(readonly userRepository: IUserRepository) {}

  async execute(input: SignUpInput): Promise<SignInOutput> {
    const user = await this.userRepository.getByEmail(input.email);

    if (!user) throw new Error("User not found.");

    if (!user.password.verify(input.password))
      throw new Error("Password is incorrect");

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
