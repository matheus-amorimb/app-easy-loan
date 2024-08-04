import Installment from "../entities/Installment";
import { Loan } from "../entities/Loan";

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

      const dueDate = new Date(initialDate);
      dueDate.setMonth(dueDate.getMonth() + counter);
      const installment = new Installment(
        counter,
        formatToTwoDecimals(outstandingBalance),
        formatToTwoDecimals(interest),
        formatToTwoDecimals(adjustedOutstandingBalance),
        formatToTwoDecimals(amount),
        dueDate
      );
      installments.push(installment);
      outstandingBalance = adjustedOutstandingBalance - amount;
      counter++;
    }
    return installments;
  }
}

function formatToTwoDecimals(value: number): number {
  return parseFloat(value.toFixed(2));
}
