import { Loan } from "../src/domain/entities/Loan";
import LoanBuilder from "./utils/LoanBuilder";
import Birthdate from "../src/domain/value-objects/Birthdate";

test("Should create a loan", function () {
  const loan = new Loan(
    "14863335750",
    "MG",
    new Birthdate(new Date("1998-06-18T00:00:00")),
    100000,
    15000
  );
  expect(loan.userCpf).toBe("14863335750");
  expect(loan.userUf).toBe("MG");
  expect(loan.userBirthdate).toEqual(
    new Birthdate(new Date("1998-06-18T00:00:00"))
  );
  expect(loan.total).toBe(100000);
  expect(loan.monthlyInstallment).toBe(15000);
});

test("Should not create a loan with a total less than 50,000", function () {
  const invalidTotal = 49000;
  expect(() => LoanBuilder.New().WithTotal(invalidTotal).Build()).toThrow(
    new Error("The minimum value for a loan is 50,000")
  );
});

test("Should not create a loan with a monthly installment less than 0.01 of the total", function () {
  const total = 100000;
  const invalidPercent = 0.8 / 100;
  const invalidMonthlyInstallment = total * invalidPercent;
  expect(() =>
    LoanBuilder.New()
      .WithTotal(total)
      .WithMonthlyInstallment(invalidMonthlyInstallment)
      .Build()
  ).toThrow(
    new Error(
      "The monthly installment for a loan must be equal to or greater than 0.01 of the total"
    )
  );
});

test("Should define interestRate based on federative unit", function () {
  const loanMG = LoanBuilder.New().WithFederativeUnit("MG").Build();
  const loanES = LoanBuilder.New().WithFederativeUnit("ES").Build();
  const loanRJ = LoanBuilder.New().WithFederativeUnit("RJ").Build();
  const loanSP = LoanBuilder.New().WithFederativeUnit("SP").Build();

  expect(loanES.interestRate).toBe(0.0111);
  expect(loanMG.interestRate).toBe(0.01);
  expect(loanRJ.interestRate).toBe(0.009);
  expect(loanSP.interestRate).toBe(0.008);
});
