import React from 'react';
import {observable, action} from 'mobx';
import {Loan} from './types';
import {createLoan, fetchLoans} from './api';

export default class DataStore {
  @observable loanIds: Array<string> = [];
  @observable loans: Map<string, Loan> = new Map();

  constructor() {}

  @action
  async submitLoan(amount: number, rate: number) {
    const loan = await createLoan(amount, rate);
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
}

export const stores = {
  dataStore: new DataStore(),
};

export const StoreContext = React.createContext(stores);

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);
