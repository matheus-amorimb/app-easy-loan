export default class Installment {
  id?: string;
  loanId?: string;

  constructor(
    readonly number: number,
    readonly outstandingBalance: number,
    readonly interest: number,
    readonly adjustedOutstandingBalance: number,
    readonly amount: number,
    readonly dueData: Date
  ) {}
}
