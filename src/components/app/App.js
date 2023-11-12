import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import Chart from 'src/components/chart';
import { REFRESH_STRATEGIES } from 'src/constants';
import User from 'src/models/user';

import styles from './App.module.scss';

const USER_NUM = 10000;
const LAST_SEEN_RANGE = 10;
const OVSERVED_DAYS = 120;
const DAYS_SPAN_PER_TICK = 10;
const AVERAGE_VISIT_FREQUENCY_IN_DAYS = 28;

const today = dayjs();

const initializeUsers = () => {
  const users = [];
  const counterpartUsers = [];

  for (let i = 0; i < USER_NUM; i++) {
    const lastSeenAt = today.subtract(_.random(LAST_SEEN_RANGE), 'day').valueOf();
    const attrs = {
      id: i + 1,
      lastSeenAt,
      sessionRefreshAt: lastSeenAt,
      tokenRefreshAt: lastSeenAt,
    };
    const user = new User(attrs);
    const counterpartUser = new User(attrs);
    users.push(user);
    counterpartUsers.push(counterpartUser);
  }

  return { users, counterpartUsers };
};

const chartDataGenerator = (users, refreshStrategy) => (day) => {
  users.forEach((user) => {
    // Simulate a user visit
    if (_.random(AVERAGE_VISIT_FREQUENCY_IN_DAYS) === 0) {
      user.visit(day, refreshStrategy);
    }
  });

  const loggedInUsers = users.filter((user) => user.isLoggedIn(day));

  return {
    day: `Day ${day.diff(today, 'day')}`,
    value: loggedInUsers.length,
    refreshStrategy,
  };
};

const App = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = [];
    const { users, counterpartUsers } = initializeUsers();
    const genDataWithExistingRefreshStrategy = chartDataGenerator(users, REFRESH_STRATEGIES.EXISTING);
    const genDataWithNewRefreshStrategy = chartDataGenerator(counterpartUsers, REFRESH_STRATEGIES.NEW);

    for (let i = 1; i <= OVSERVED_DAYS; i++) {
      const day = today.add(i, 'day');
      data.push(genDataWithExistingRefreshStrategy(day));
      data.push(genDataWithNewRefreshStrategy(day));
    }

    setChartData(data);
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
