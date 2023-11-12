import dayjs from 'dayjs';

class User {
  constructor({ id, tokenRefreshAt, sessionRefreshAt }) {
    this.id = id;
    this.tokenRefreshAt = tokenRefreshAt;
    this.sessionRefreshAt = sessionRefreshAt;
  }

  isLoggedIn = (day) => {
    // this.sessionRefreshAt.diff(day, 'day') < 1;
  };
}

export default User;
