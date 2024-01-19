const SIGNINATTEMPTED = 'auth/signin_attempted';
const SIGNINSUCCESS = 'auth/signin_success';
const SIGNINFAILED = 'auth/signin_failed';

const SIGNUPEMAILVALIDATED = 'auth/signup_email_validated';
const SIGNUPFORMUPDATED = 'auth/signup_form_updated';
const SIGNUPATTEMPTED = 'auth/signup_attempted';
const SIGNUPSUCCESS = 'auth/signup_success';
const SIGNUPFAILED = 'auth/signup_failed';

const VALIDATEACCOUNTATTEMPTED = 'auth/validate_account_attempted';
const VALIDATEACCOUNTSUCCESS = 'auth/validate_account_success';
const VALIDATEACCOUNTFAILED = 'auth/validate_account_failed';

const SIGNOUTATTEMPTED = 'auth/signout_attempted';
const SIGNOUTSUCCESS = 'auth/signout_success';
const SIGNOUTFAILED = 'auth/signout_failed';

// ASYNC STORAGE
const HYDRATESTARTED = 'auth/hydrate_attempted';
const HYDRATESUCCESS = 'auth/hydrate_success';
const HYDRATEFAILED = 'auth/hydrate_failed';

export const AUTH = {
  SIGNINATTEMPTED,
  SIGNINSUCCESS,
  SIGNINFAILED,
  SIGNOUTATTEMPTED,
  SIGNOUTSUCCESS,
  SIGNOUTFAILED,
  SIGNUPEMAILVALIDATED,
  SIGNUPFORMUPDATED,
  SIGNUPATTEMPTED,
  SIGNUPSUCCESS,
  SIGNUPFAILED,
  VALIDATEACCOUNTATTEMPTED,
  VALIDATEACCOUNTSUCCESS,
  VALIDATEACCOUNTFAILED,
  HYDRATESTARTED,
  HYDRATESUCCESS,
  HYDRATEFAILED,
};

export default AUTH;
