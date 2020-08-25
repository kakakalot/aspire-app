// import {wait} from './utils';
import {Loan, LoanStatus, Repayment, RepaymentStatus} from './types';
import {TIME_TO_APPROVE_LOAN} from './configs';

type Data = {
  loans: Map<string, Loan>;
};

const apiData: Data = {loans: new Map()};

const createLoan = async (amount: number, weeks: number): Promise<Loan> => {
  // wait(1000);
  const startTime = new Date().getTime();
  const id = startTime.toString();
  const repaymentSchedule = Array.from(
    {length: weeks},
    () => ({status: RepaymentStatus.New} as Repayment),
  );
  const loan: Loan = {
    id,
    amount,
    createDate: startTime,
    status: LoanStatus.New,
    repaymentSchedule,
  };

  apiData.loans.set(id, loan);
  return {...loan};
};

const fetchLoans = async (): Promise<Array<Loan>> => {
  // wait(2000);

  const currentTime = new Date().getTime();
  const result: Array<Loan> = [];
  const loanIds = apiData.loans.keys();

  for (const id of loanIds) {
    const loan = apiData.loans.get(id) as Loan;
    if (
      loan.status === LoanStatus.New &&
      currentTime - loan.createDate >= TIME_TO_APPROVE_LOAN
    ) {
      loan.status = LoanStatus.Approved;
    }

    result.push({...loan});
  }

  console.log(apiData);
  return result;
};

const repayLoan = async (loanId: string): Promise<Loan | undefined> => {
  const loan = apiData.loans.get(loanId);

  if (!loan) {
    return;
  }

  loan.status = LoanStatus.Repaying;
  const currentWeek = loan.repaymentSchedule.findIndex(
    (v) => v.status !== RepaymentStatus.Done,
  );
  const schedule = loan.repaymentSchedule[currentWeek];

  if (schedule) {
    loan.repaymentSchedule[currentWeek] = {
      status: RepaymentStatus.Done,
      doneDate: new Date().getTime(),
    } as Repayment;

    const remain = loan.repaymentSchedule.find(
      (v) => v.status !== RepaymentStatus.Done,
    );
    if (!remain) {
      loan.status = LoanStatus.Finished;
    }
  }

  return {...loan};
};

export {createLoan, fetchLoans, repayLoan};
