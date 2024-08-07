import { IsNotEmpty } from "class-validator";

export default interface GetInstallmentsInput {
  loanId: string;
}

export class GetInstallmentsInputClass {
  @IsNotEmpty()
  loanId!: string;
}
