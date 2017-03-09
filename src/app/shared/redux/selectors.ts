import { RootState } from './index';

const tokenSelector = (state: RootState) => {
  return state.token;
};

export const StateSelectors = {
  token: tokenSelector
};