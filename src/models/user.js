import dayjs from 'dayjs';

import { SESSION_EXPIRES_IN_DAYS, TOKEN_EXPIRES_IN_DAYS, REFRESH_STRATEGIES } from 'src/constants';

class User {
  constructor({ id, tokenRefreshAt, sessionRefreshAt, lastSeenAt }) {
    this.id = id;
    this.lastSeenAt = dayjs(lastSeenAt);
    this.sessionRefreshAt = dayjs(sessionRefreshAt);
    this.tokenRefreshAt = dayjs(tokenRefreshAt);
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

  visit = (day, refreshStrategy) => {
    this.lastSeenAt = day;

    if (refreshStrategy === REFRESH_STRATEGIES.EXISTING) {
      this.tokenRefreshAt = day;
      this.sessionRefreshAt = day;
    }

    if (refreshStrategy === REFRESH_STRATEGIES.NEW) {
      if (this.isLoggedIn(day) && this.isTokenExpired(day)) {
        this.tokenRefreshAt = day;
        this.sessionRefreshAt = day;
      }
    }
  };
}

export default User;
