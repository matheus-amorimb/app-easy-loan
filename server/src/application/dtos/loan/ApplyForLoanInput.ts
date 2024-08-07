import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import "reflect-metadata";

export default interface ApplyForLoanInput {
  userEmail: string;
  total: number;
  monthlyInstallment: number;
}

export class ApplyForLoanInputClass {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  monthlyInstallment!: number;
}
