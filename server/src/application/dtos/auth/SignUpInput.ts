import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export interface SignUpInput {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  birthdate: Date;
  uf: string;
}

export class SignUpInputClass {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  cpf!: string;

  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long." })
  password!: string;

  @IsNotEmpty()
  confirmPassword!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthdate!: string;

  @IsNotEmpty()
  uf!: string;
}
