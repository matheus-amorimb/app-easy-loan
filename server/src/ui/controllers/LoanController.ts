import { Request, Response } from "express";
import SimulateLoan from "../../application/use-cases/Loan/SimulateLoan";
import { SimulateLoanInputClass } from "../../application/dtos/loan/SimulateLoanInput";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ApplyForLoan from "../../application/use-cases/Loan/ApplyForLoan";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import ILoanRepository from "../../application/repositories/ILoanRepository";
import LoanRepository from "../../infrastructure/repositories/LoanRepository";
import IInstallmentRepository from "../../application/repositories/IInstallmentRepository";
import InstallmentRepository from "../../infrastructure/repositories/InstallmentRepository";
import { ApplyForLoanInputClass } from "../../application/dtos/loan/ApplyForLoanInput";
import { formatErrorMessage } from "../utils/FormatErrorMessage";
import GetLoans from "../../application/use-cases/Loan/GetLoans";
import IUserRepository from "../../application/repositories/IUserRepository";
import UserRepository from "../../infrastructure/repositories/UserRepository";

const connection: DatabaseConnection = new DatabaseConnection();
const loanRepository: ILoanRepository = new LoanRepository(connection);
const installmentRepository: IInstallmentRepository = new InstallmentRepository(
  connection
);
const userRepository: IUserRepository = new UserRepository(connection);

export default class LoanController {
  static async simulate(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(SimulateLoanInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const simulateLoan = new SimulateLoan(userRepository);
    try {
      const simulateLoanInput = {
        userEmail: res.locals.user.email,
        total: input.total,
        monthlyInstallment: input.monthlyInstallment,
      };
      const installments = await simulateLoan.execute(simulateLoanInput);
      res.status(201).json(installments);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async apply(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(ApplyForLoanInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const applyForLoan = new ApplyForLoan(
      userRepository,
      loanRepository,
      installmentRepository
    );
    try {
      const applyForLoanInput = {
        userEmail: res.locals.user.email,
        total: input.total,
        monthlyInstallment: input.monthlyInstallment,
      };
      const applyForLoanOutput = await applyForLoan.execute(applyForLoanInput);
      res.status(201).json({ loanId: applyForLoanOutput.loanId });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async all(req: Request, res: Response): Promise<void> {
    const getLoans = new GetLoans(userRepository, loanRepository);
    try {
      const loans = await getLoans.execute(res.locals.user.email);
      res.status(200).json({ loans });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
