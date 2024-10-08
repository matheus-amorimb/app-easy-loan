import Installment from "../entities/Installment";
import { Loan } from "../entities/Loan";
import { addMonthsToDate } from "./AddMonthsToDate";

export default class CalculateInstallements {
  static calculate(input: Loan): Installment[] {
    let outstandingBalance = input.total;
    let installments: Installment[] = [];
    let counter = 1;
    let amount = 0;
    const initialDate = new Date(input.date);

    while (outstandingBalance > 0) {
      const interest = input.interestRate * outstandingBalance;
      const adjustedOutstandingBalance = outstandingBalance + interest;
      amount =
        adjustedOutstandingBalance < input.monthlyInstallment
          ? adjustedOutstandingBalance
          : input.monthlyInstallment;

      const dueDate = addMonthsToDate(initialDate, counter);
      const installment = Installment.create(
        input.id,
        counter,
        formatToTwoDecimals(outstandingBalance),
        formatToTwoDecimals(interest),
        formatToTwoDecimals(adjustedOutstandingBalance),
        formatToTwoDecimals(amount),
        dueDate
      );
      installments.push(installment);
      outstandingBalance = adjustedOutstandingBalance - amount;
      // if (outstandingBalance > 300000) outstandingBalance = 0;
      counter++;
    }
    return installments;
  }
}

function formatToTwoDecimals(value: number): number {
  return parseFloat(value.toFixed(2));
}
