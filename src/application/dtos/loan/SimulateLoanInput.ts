import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import "reflect-metadata";

export default interface SimulateLoanInput {
  userCpf: string;
  userUf: string;
  userBirthdate: Date;
  total: number;
  monthlyInstallment: number;
}

export class SimulateLoanInputClass {
  @IsString()
  @IsNotEmpty()
  userCpf!: string;

  @IsString()
  @IsNotEmpty()
  userUf!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  userBirthdate!: Date;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  monthlyInstallment!: number;
}
