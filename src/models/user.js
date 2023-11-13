import dayjs from 'dayjs';

import { SESSION_EXPIRES_IN_DAYS, TOKEN_EXPIRES_IN_DAYS, REFRESH_STRATEGIES } from 'src/constants';

class User {
  constructor({ id, isNewlyRegistered, tokenRefreshAt, sessionRefreshAt, lastSeenAt }) {
    this.id = id;
    this.isNewlyRegistered = isNewlyRegistered;
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

  refresh = (day) => {
    this.tokenRefreshAt = day;
    this.sessionRefreshAt = day;
  };

  visit = (day, refreshStrategy) => {
    this.lastSeenAt = day;

    if (!this.isLoggedIn(day)) {
      return;
    }

    if (refreshStrategy === REFRESH_STRATEGIES.EXISTING) {
      if (this.isNewlyRegistered && this.isTokenExpired(day)) {
        return this.refresh(day);
      }

      this.refresh(day);
    }

    if (refreshStrategy === REFRESH_STRATEGIES.NEW) {
      if (this.isTokenExpired(day)) {
        this.refresh(day);
      }
    }
  };
}

export default User;
