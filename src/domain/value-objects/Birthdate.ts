export default class Birthdate {
  private value: Date;

  constructor(birthdate: Date) {
    if (!this.validate(birthdate)) throw new Error("Invalid birthdate");
    this.value = birthdate;
  }

  private validate(birthdate: Date): boolean {
    return new Date() > birthdate;
  }
}
