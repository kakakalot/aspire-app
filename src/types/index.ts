export enum LoanStatus {
  New = 'New',
  Approved = 'Approved',
  Repaying = 'Repaying',
  Finished = 'Finished',
}

export type Loan = {
  id: string;
  amount: number;
  createDate: number;
  duaDate?: number;
  status: LoanStatus;
  repaymentSchedule: Repayment[];
};

export type Repayment = {
  doneDate?: number;
  status: RepaymentStatus;
};

export enum RepaymentStatus {
  New = 'New',
  Done = 'Done',
}

export type User = {
  id: string;
  loanIds: Array<string>;
};

// export type Users = {
//   [key: string]: User;
// };

// export type Loans = {
//   [key: string]: Loan;
// };
