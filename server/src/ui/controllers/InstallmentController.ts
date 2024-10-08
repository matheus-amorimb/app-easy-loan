import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import ILoanRepository from "../../application/repositories/ILoanRepository";
import LoanRepository from "../../infrastructure/repositories/LoanRepository";
import IInstallmentRepository from "../../application/repositories/IInstallmentRepository";
import InstallmentRepository from "../../infrastructure/repositories/InstallmentRepository";
import { formatErrorMessage } from "../utils/FormatErrorMessage";
import IUserRepository from "../../application/repositories/IUserRepository";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import GetInstallments from "../../application/use-cases/Installment/GetInstallments";
import { GetInstallmentsInputClass } from "../../application/dtos/installment/GetInstallmentsInput";

const connection: DatabaseConnection = DatabaseConnection.getInstance();
const installmentRepository: IInstallmentRepository = new InstallmentRepository(
  connection
);
const userRepository: IUserRepository = new UserRepository(connection);

export default class LoanController {
  static async get(req: Request, res: Response): Promise<void> {
    const loanId = req.params.id;
    const input = plainToInstance(GetInstallmentsInputClass, { loanId });
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const getInstallments = new GetInstallments(installmentRepository);
    try {
      const simulateLoanInput = {
        loanId: loanId,
      };
      const installments = await getInstallments.execute(simulateLoanInput);
      res.status(201).json(installments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
