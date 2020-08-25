export enum LoanStatus {
  New = 'New',
  Approved = 'Approved',
  Repaying = 'Repaying',
  Finished = 'Finished',
  Overdue = 'Overdue',
}

export type Loan = {
  id: string;
  rate: number;
  amount: number;
  createDate: number;
  duaDate?: number;
  status: LoanStatus;
};

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
