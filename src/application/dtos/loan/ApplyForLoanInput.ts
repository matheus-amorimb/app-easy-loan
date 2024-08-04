import { FederativeUnit } from "../../../domain/types/FederativeUnit.type";

export default interface ApplyForLoanInput {
  userCpf: string;
  userUf: string;
  userBirthday: Date;
  total: number;
  monthlyInstallment: number;
}
