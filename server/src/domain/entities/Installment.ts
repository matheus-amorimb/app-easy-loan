export default class Installment {
  constructor(
    readonly id: string,
    readonly loanId: string | null,
    readonly number: number,
    readonly outstandingBalance: number,
    readonly interest: number,
    readonly adjustedOutstandingBalance: number,
    readonly amount: number,
    readonly dueData: Date
  ) {}

  static create(
    loanId: string,
    number: number,
    outstandingBalance: number,
    interest: number,
    adjustedOutstandingBalance: number,
    amount: number,
    dueData: Date
  ): Installment {
    const id = crypto.randomUUID();
    return new Installment(
      id,
      loanId,
      number,
      outstandingBalance,
      interest,
      adjustedOutstandingBalance,
      amount,
      dueData
    );
  }

  static restore(
    id: string,
    loanId: string,
    number: number,
    outstandingBalance: number,
    interest: number,
    adjustedOutstandingBalance: number,
    amount: number,
    dueData: Date
  ) {
    return new Installment(
      id,
      loanId,
      number,
      outstandingBalance,
      interest,
      adjustedOutstandingBalance,
      amount,
      dueData
    );
  }
}
