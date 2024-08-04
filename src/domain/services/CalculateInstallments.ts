import UseCase from "../../application/use-cases/UseCase";
import Installment from "../entities/Installment";
import { Loan } from "../entities/Loan";

export default class CalculateInstallements {
  static calculate(input: Loan): Installment[] {
    throw new Error("Method not implemented.");
  }
}
