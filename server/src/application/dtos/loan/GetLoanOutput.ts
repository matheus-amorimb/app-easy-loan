import Birthdate from "../../../domain/value-objects/Birthdate";

export default interface GetLoanOutput {
  id: string;
  userUf: string;
  total: number;
  monthlyInstallment: number;
  date: Date;
}
