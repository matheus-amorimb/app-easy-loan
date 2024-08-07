import crypto from "crypto";

export default class Password {
  value!: string;

  constructor(password: string, isHash: boolean = false) {
    this.value = isHash
      ? password
      : crypto.createHash("sha256").update(password).digest("hex");
  }

  verify(password: string): boolean {
    return (
      this.value === crypto.createHash("sha256").update(password).digest("hex")
    );
  }
}
