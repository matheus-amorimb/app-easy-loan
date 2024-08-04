export default class Birthdate {
  readonly value: Date;

  constructor(birthdate: Date) {
    if (!this.validate(birthdate)) throw new Error("Invalid birthdate");
    this.value = birthdate;
  }

  private validate(birthdate: Date): boolean {
    return new Date() > birthdate;
  }
}
