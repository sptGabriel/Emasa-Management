/* eslint-disable prettier/prettier */
import { validate, validateSync, ValidationError } from 'class-validator';

export abstract class Validatable {
  public get ValidationErrors(): ValidationError[] {
    return validateSync(this);
  }

  public get isValid(): boolean {
    const hasErrors = validateSync(this);
    return !(hasErrors.length > 0);
  }

  public validate = async (): Promise<ValidationError[]> => {
    return validate(this);
  };
}
