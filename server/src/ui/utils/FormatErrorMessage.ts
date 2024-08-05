import { ValidationError } from "class-validator";

export function formatErrorMessage(errors: ValidationError[]) {
  return errors?.map((error: ValidationError) => ({
    property: error.property,
    constraints: error.constraints,
  }));
}
