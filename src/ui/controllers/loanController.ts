import { Request, Response } from "express";
import SimulateLoan from "../../application/use-cases/SimulateLoan";
import { SimulateLoanInputClass } from "../../application/dtos/loan/SimulateLoanInput";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ApplyForLoan from "../../application/use-cases/ApplyForLoan";
import DatabaseConnection from "../../infrastructure/database/DatabaseConnection";
import ILoanRepository from "../../application/repositories/ILoanRepository";
import LoanRepository from "../../infrastructure/repositories/LoanRepository";
import IInstallmentRepository from "../../application/repositories/IInstallmentRepository";
import InstallmentRepository from "../../infrastructure/repositories/InstallmentRepository";
import { ApplyForLoanInputClass } from "../../application/dtos/loan/ApplyForLoanInput";
import { formatErrorMessage } from "../utils/FormatErrorMessage";
import GetLoans from "../../application/use-cases/GetLoans";

const connection: DatabaseConnection = new DatabaseConnection();
const loanRepository: ILoanRepository = new LoanRepository(connection);
const installmentRepository: IInstallmentRepository = new InstallmentRepository(
  connection
);

export default class LoanController {
  static async Simulate(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(SimulateLoanInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const simulateLoan = new SimulateLoan();
    try {
      const simulateLoanInput = {
        userCpf: input.userCpf,
        userUf: input.userUf,
        userBirthdate: input.userBirthdate,
        total: input.total,
        monthlyInstallment: input.monthlyInstallment,
      };
      const installments = await simulateLoan.execute(simulateLoanInput);
      res.status(201).json({ installments });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async Apply(req: Request, res: Response): Promise<void> {
    const input = plainToInstance(ApplyForLoanInputClass, req.body);
    const errors = await validate(input);
    if (errors.length > 0) {
      res.status(400).json(formatErrorMessage(errors));
      return;
    }
    const applyForLoan = new ApplyForLoan(
      loanRepository,
      installmentRepository
    );
    try {
      const applyForLoanInput = {
        userCpf: input.userCpf,
        userUf: input.userUf,
        userBirthdate: input.userBirthdate,
        total: input.total,
        monthlyInstallment: input.monthlyInstallment,
      };
      const applyForLoanOutput = await applyForLoan.execute(applyForLoanInput);
      res.status(201).json({ loanId: applyForLoanOutput.loanId });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async All(req: Request, res: Response): Promise<void> {
    const getLoans = new GetLoans(loanRepository);
    try {
      const loans = await getLoans.execute();
      res.status(200).json({ loans });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
