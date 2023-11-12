import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect } from 'react';

import User from 'src/models/user';

import styles from './App.module.scss';

const USER_NUM = 10000;
const LAST_SEEN_RANGE = 10;
const OVSERVED_DAYS = 90;
const AVERAGE_VISIT_FREQUENCY_IN_DAYS = 28;

const today = dayjs();

const initializeUsers = () => {
  const users = [];

  for (let i = 0; i < USER_NUM; i++) {
    const lastSeenAt = today.subtract(_.random(LAST_SEEN_RANGE), 'day');

    users.push(
      new User({
        id: i + 1,
        lastSeenAt,
        sessionRefreshAt: lastSeenAt,
        tokenRefreshAt: lastSeenAt,
      }),
    );
  }

  return users;
};

const App = () => {
  useEffect(() => {
    const users = initializeUsers();

    for (let i = 1; i <= OVSERVED_DAYS; i++) {
      const day = today.add(i, 'day');

      users.forEach((user) => {
        // Simulate a user visit
        if (_.random(AVERAGE_VISIT_FREQUENCY_IN_DAYS) === 0) {
          user.visit(day);
        }
      });

      const loggedInUsers = users.filter((user) => user.isLoggedIn(day));
      console.log(`Day ${i}: ${loggedInUsers.length} users logged in.`);
    }
  }, []);

  return (
    <div className={styles.root}>
      <h1>Sign-In Rate Simulator</h1>
    </div>
  );
};

export default App;
