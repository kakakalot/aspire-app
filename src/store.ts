import React from 'react';
import {observable, action} from 'mobx';
import {Loan} from './types';
import {createLoan, fetchLoans, repayLoan} from './api';

export default class DataStore {
  @observable loanIds: Array<string> = [];
  @observable loans: Map<string, Loan> = new Map();

  constructor() {}

  @action
  async submitLoan(amount: number, weeks: number) {
    const loan = await createLoan(amount, weeks);
    this.loans.set(loan.id, loan);
    this.loanIds.push(loan.id);
  }

  @action
  async updateLoans() {
    console.log('...updateLoans');
    const loans = await fetchLoans();
    loans.forEach((loan) => {
      this.loans.set(loan.id, loan);
    });
    console.log('...done');
  }

  @action
  async repayLoan(loanId: string) {
    const loan = await repayLoan(loanId);
    if (!loan) {
      return;
    }
    console.log(loan);
    this.loans.set(loan.id, loan);
  }
}

export const stores = {
  dataStore: new DataStore(),
};

export const StoreContext = React.createContext(stores);

export const useStore = () => React.useContext(StoreContext);
