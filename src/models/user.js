import { SESSION_EXPIRES_IN_DAYS, TOKEN_EXPIRES_IN_DAYS } from 'src/constants';

class User {
  constructor({ id, tokenRefreshAt, sessionRefreshAt, lastSeenAt }) {
    this.id = id;
    this.lastSeenAt = lastSeenAt;
    this.sessionRefreshAt = sessionRefreshAt;
    this.tokenRefreshAt = tokenRefreshAt;
  }

  isLoggedIn = (day) => {
    return !this.isSessionExpired(day);
  };

  isSessionExpired = (day) => {
    return day.diff(this.sessionRefreshAt, 'day') > SESSION_EXPIRES_IN_DAYS;
  };

  isTokenExpired = (day) => {
    return day.diff(this.tokenRefreshAt, 'day') > TOKEN_EXPIRES_IN_DAYS;
  };

  visit = (day) => {
    this.lastSeenAt = day;

    // if (this.isLoggedIn(day) && this.isTokenExpired(day)) {
    //   this.tokenRefreshAt = day;
    //   this.sessionRefreshAt = day;
    // }

    this.tokenRefreshAt = day;
    this.sessionRefreshAt = day;
  };
}

export default User;
