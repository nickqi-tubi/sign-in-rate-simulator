import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import Chart from 'src/components/chart';
import User from 'src/models/user';

import styles from './App.module.scss';

const USER_NUM = 10000;
const LAST_SEEN_RANGE = 10;
const OVSERVED_DAYS = 90;
const DAYS_SPAN_PER_TICK = 9;
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
  const [chartData, setChatData] = useState([]);

  useEffect(() => {
    const data = [];
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

      data.push({
        day: `Day ${i}`,
        value: loggedInUsers.length,
      });
    }

    setChatData(data);
  }, []);

  const chartProps = {
    data: chartData,
    config: {
      xAxis: {
        tickCount: OVSERVED_DAYS / DAYS_SPAN_PER_TICK,
      },
    },
  };

  return (
    <div className={styles.root}>
      <h1>Sign-In Rate Simulator</h1>
      <Chart {...chartProps} />
    </div>
  );
};

export default App;
