import { Loan } from "../src/Entities/Loan";
import LoanBuilder from "./utilities/LoanBuilder";

test("Should create a loan", function () {
  const loan = new Loan("14863335750", "MG", "18/06/1998", 100000, 15000);
  expect(loan.userCpf).toBe("14863335750");
  expect(loan.userUf).toBe("MG");
  expect(loan.userBirthday).toBe("18/06/1998");
  expect(loan.total).toBe(100000);
  expect(loan.monthlyValue).toBe(15000);
});

test("Should not create a loan with a total less than 50,000", function () {
  const invalidTotal = 49000;
  expect(() => LoanBuilder.New().WithTotal(invalidTotal).Build()).toThrow(
    new Error("The minimum value for a loan is 50,000")
  );
});
