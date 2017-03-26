import AppDispatcher from './AppDispatcher';
import BankBalanceStore from './BankBalanceStore';
import bankConstants from './constants';
import { ReduceStore } from 'flux/utils';

class BankRewardsStore extends ReduceStore {
  getInitialState() {
    return 'Basic';
  }

  reduce(state, action) {
    this.getDispatcher().waitFor([
      //BankBalanceStore의 금액계산이 끝나야 등급을 계산할 수 있으므로 BankBalanceStore작업이 끝날때까지 대기한다.
      BankBalanceStore.getDispatchToken()
    ]);

    if (action.type === bankConstants.DEPOSITED_INTO_ACCOUNT || action.type === bankConstants.WITHDREW_FROM_ACCOUNT) {
      let balance = BankBalanceStore.getState();

      if (balance < 5000) {
        return 'Basic';
      } else if (balance < 10000) {
        return 'Silver';
      } else if (balance < 50000) {
        return 'Gold';
      } else {
        return 'Platinum';
      }
    }

    return state;
  }
}

export default new BankRewardsStore(AppDispatcher);
