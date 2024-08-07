import { Type } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import "reflect-metadata";

export default interface GetLoanInput {
  loanId: string;
}

export class GetLoanInputClass {
  @Type(() => UUID)
  @IsUUID()
  @IsNotEmpty()
  loanId!: string;
}
