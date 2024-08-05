import Birthdate from "../../../domain/value-objects/Birthdate";

export default interface GetLoanOutput {
  id: string;
  userCpf: string;
  userUf: string;
  userBirthdate: Birthdate;
  total: number;
  monthlyInstallment: number;
  date: Date;
}
