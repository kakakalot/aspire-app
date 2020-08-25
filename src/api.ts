import {wait} from './utils';
import {Loan, LoanStatus} from './types';

type Data = {
  loans: Map<string, Loan>;
};
const apiData: Data = {loans: new Map()};
const diffTimeToApproveLoan = 10 * 1000; // 10 seconds

const createLoan = async (amount: number, rate: number): Promise<Loan> => {
  wait(1000);
  const startTime = new Date().getTime();
  const id = startTime.toString();
  const loan = {
    id,
    amount,
    rate,
    createDate: startTime,
    status: LoanStatus.New,
  };

  apiData.loans.set(id, loan);
  return loan;
};

const fetchLoans = async (): Promise<Array<Loan>> => {
  wait(2000);

  const currentTime = new Date().getTime();
  const result: Array<Loan> = [];
  const loanIds = apiData.loans.keys();

  for (const id of loanIds) {
    const loan = apiData.loans.get(id) as Loan;
    if (
      loan.status === LoanStatus.New &&
      currentTime - loan.createDate >= diffTimeToApproveLoan
    ) {
      loan.status = LoanStatus.Approved;
    }

    result.push(loan);
  }

  console.log(apiData);
  return result;
};

const repayLoan = (loanId: string) => {
  wait(2000);
  // const currentTime = new Date().getTime();
  // const result: Array<Loan> = [];
  const loan = apiData.loans.get(loanId);

};

export {createLoan, fetchLoans, repayLoan};
