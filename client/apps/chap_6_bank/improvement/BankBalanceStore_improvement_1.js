import { Store } from 'flux/utils'
import AppDispatcher from './AppDispatcher';
import bankConstants from './constants';

let balance = 0;

class BankBalanceStore_improvement_1 extends Store {
  getState() {
    return __balance;
  }

  __onDispatch(action) {
    switch (action.type) {
      case bankConstants.CREATE_ACCOUNT:
        balance = 0;
        this.__emitChange();
        break;
      case bankConstants.DEPOSITED_INTO_ACCOUNT:
        balance = balance + action.amount;
        this.__emitChange();
        break;
      case bankConstants.WITHDREW_FROM_ACCOUNT:
        balance = balance - action.amount;
        this.__emitChange();
        break;
    }
  }
}

export default new BankBalanceStore_improvement_1(AppDispatcher);