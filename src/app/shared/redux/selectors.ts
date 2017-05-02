import { RootState } from './index';

const tokenSelector = (state: RootState) => {
  return state.token;
};

const layoutSelector = (state: RootState) => {
  return state.layout;
};

const locationSelector = (state: RootState) => {
  return state.location;
};

const globalSelector = (state: RootState) => {
  return state.global;
}

export const StateSelectors = {
  token: tokenSelector,
  layout: layoutSelector,
  location: locationSelector,
  global: globalSelector
};
