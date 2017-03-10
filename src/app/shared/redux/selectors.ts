import { RootState } from './index';

const tokenSelector = (state: RootState) => {
  return state.token;
};

const layoutSelector = (state: RootState) => {
  return state.layout;
};

export const StateSelectors = {
  token: tokenSelector,
  layout: layoutSelector
};
