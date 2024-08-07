import { plainToInstance, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { Request, Response } from "express";
import { formatErrorMessage } from "../utils/FormatErrorMessage";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import SignUp from "../../application/use-cases/User/SIgnUp";
import { SignUpInputClass } from "../../application/dtos/auth/SignUpInput";
import { SignUpOutput } from "../../application/dtos/auth/SignUpOutput";
import IUserRepository from "../../application/repositories/IUserRepository";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import Password from "../../domain/value-objects/Password";
import SignIn from "../../application/use-cases/User/SignIn";
import { SignInInputClass } from "../../application/dtos/auth/SIgnInInput";

const connection: DatabaseConnection = new DatabaseConnection();
const userRepository: IUserRepository = new UserRepository(connection);

export default class AuthController {
  static async SignUp(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(SignUpInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const signUp = new SignUp(userRepository);
    try {
      const signUpInput = {
        fullName: input.fullName,
        email: input.email,
        cpf: input.cpf,
        password: input.password,
        confirmPassword: input.confirmPassword,
        birthdate: new Date(input.birthdate),
        uf: input.uf,
      };
      const signUpOutput: SignUpOutput = await signUp.execute(signUpInput);
      res.status(201).json(signUpOutput);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async SignIn(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(SignInInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const signIn = new SignIn(userRepository);
    try {
      const signInInput = {
        email: input.email,
        password: input.password,
      };
      const signUpOutput: SignUpOutput = await signIn.execute(signInInput);
      res.status(201).json(signUpOutput);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
