export default interface SimulateLoanOutput {
  number: number;
  outstandingBalance: number;
  interest: number;
  adjustedOutstandingBalance: number;
  amount: number;
  dueData: Date;
}
