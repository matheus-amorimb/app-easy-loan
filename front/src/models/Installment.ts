export interface Installment {
  id: string;
  loanId: string | null;
  number: number;
  outstandingBalance: number;
  interest: number;
  adjustedOutstandingBalance: number;
  amount: number;
  dueData: string;
}
