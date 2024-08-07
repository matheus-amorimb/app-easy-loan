import { IsEmail, IsNotEmpty } from "class-validator";

export interface SignUpInput {
  email: string;
  password: string;
}

export class SignInInputClass {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
