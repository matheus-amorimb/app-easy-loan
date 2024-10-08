import CalculateInstallments from "../../src/domain/services/CalculateInstallments";
import { addMonthsToDate } from "../utils/AddMonthsToDate";
import LoanBuilder from "../utils/LoanBuilder";

test("Should calculate installments for a loan", function () {
  const loan = LoanBuilder.new().build();
  const installments = CalculateInstallments.calculate(loan);

  expect(installments).toBeDefined();
  expect(installments).toHaveLength(5);

  const firstInstallment = installments[0];
  expect(firstInstallment.number).toBe(1);
  expect(firstInstallment.outstandingBalance).toBe(60000);
  expect(firstInstallment.interest).toBe(600);
  expect(firstInstallment.adjustedOutstandingBalance).toBe(60600);
  expect(firstInstallment.amount).toBe(15000);
  let firstDate = addMonthsToDate(loan.date, 1);
  expect(firstInstallment.dueData).toEqual(firstDate);

  const lastInstallment = installments[4];
  expect(lastInstallment.number).toBe(5);
  expect(lastInstallment.outstandingBalance).toBe(1530.23);
  expect(lastInstallment.interest).toBe(15.3);
  expect(lastInstallment.adjustedOutstandingBalance).toBe(1545.53);
  expect(lastInstallment.amount).toBe(1545.53);
  let finalDate = addMonthsToDate(loan.date, 5);
  expect(lastInstallment.dueData).toEqual(finalDate);
});
