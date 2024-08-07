import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import "reflect-metadata";

export default interface SimulateLoanInput {
  userEmail: string;
  total: number;
  monthlyInstallment: number;
}

export class SimulateLoanInputClass {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  monthlyInstallment!: number;
}
