import { Typography, Spin } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import Chart from 'src/components/chart';
import Settings from 'src/components/settings';
import { REFRESH_STRATEGIES, SESSION_EXPIRES_IN_DAYS, TOTAL_USERS, STATUS } from 'src/constants';
import User from 'src/models/user';

import styles from './App.module.scss';

const LAST_SEEN_RANGE = 10;
const OVSERVED_DAYS = 120;
const DAYS_SPAN_PER_TICK = 10;
const AVERAGE_VISIT_FREQUENCY_IN_DAYS = 10;
const NEWLY_REGISTERED_USER_RATE = 0.2;

const today = dayjs();

const initializeUsers = ({ totalUsers }) => {
  const users = [];
  const counterpartUsers = [];

  for (let i = 0; i < totalUsers; i++) {
    const lastSeenAtDay = today.subtract(_.random(LAST_SEEN_RANGE), 'day');
    const lastSeenAt = lastSeenAtDay.valueOf();
    const isNewlyRegistered = _.random(1, true) <= NEWLY_REGISTERED_USER_RATE;

    const attrs = {
      id: i + 1,
      isNewlyRegistered,
      lastSeenAt,
      sessionRefreshAt: lastSeenAt,
      tokenRefreshAt: lastSeenAt,
    };

    if (isNewlyRegistered) {
      const lastSeenDiff = today.diff(lastSeenAtDay, 'day');
      const daysAgo = _.random(0, SESSION_EXPIRES_IN_DAYS - lastSeenDiff);
      const refreshAt = lastSeenAtDay.subtract(daysAgo, 'day').valueOf();
      attrs.sessionRefreshAt = refreshAt;
      attrs.tokenRefreshAt = refreshAt;
    }

    const user = new User(attrs);
    const counterpartUser = new User(attrs);

    users.push(user);
    counterpartUsers.push(counterpartUser);
  }

  return { users, counterpartUsers };
};

const chartDataGenerator = (users, refreshStrategy) => (day) => {
  const dayDiff = day.diff(today, 'day');

  if (dayDiff > 0) {
    users.forEach((user) => {
      // Simulate a user visit
      if (_.random(AVERAGE_VISIT_FREQUENCY_IN_DAYS) === 0) {
        user.visit(day, refreshStrategy);
      }
    });
  }

  const loggedInUsers = users.filter((user) => user.isLoggedIn(day));

  return {
    day: `Day ${dayDiff}`,
    value: loggedInUsers.length,
    refreshStrategy:
      refreshStrategy === REFRESH_STRATEGIES.EXISTING ? 'Existing Refresh Strategy' : 'New Refresh Strategy',
  };
};

const App = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [chartData, setChartData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(TOTAL_USERS.default);

  useEffect(() => {
    if (status !== STATUS.IDLE) {
      return;
    }

    setStatus(STATUS.RUNNING);

    const { users, counterpartUsers } = initializeUsers({
      totalUsers,
    });
    const genDataWithExistingRefreshStrategy = chartDataGenerator(users, REFRESH_STRATEGIES.EXISTING);
    const genDataWithNewRefreshStrategy = chartDataGenerator(counterpartUsers, REFRESH_STRATEGIES.NEW);
    const data = [];

    for (let i = 0; i <= OVSERVED_DAYS; i++) {
      const day = today.add(i, 'day');
      data.push(genDataWithExistingRefreshStrategy(day));
      data.push(genDataWithNewRefreshStrategy(day));
    }

    setChartData(data);

    _.delay(() => {
      setStatus(STATUS.DONE);
    }, 2000);
  }, [status, totalUsers]);

  const settingsProps = {
    status,
    setStatus,
    totalUsers,
    setTotalUsers,
  };

  const chartProps = {
    data: chartData,
    config: {
      xAxis: {
        tickCount: OVSERVED_DAYS / DAYS_SPAN_PER_TICK + 1,
      },
    },
  };

  return (
    <div className={styles.root}>
      <Typography.Title level={1}>Sign-In Rate Simulator</Typography.Title>
      <Settings {...settingsProps} />
      {status === STATUS.RUNNING ? (
        <div className={styles.spinner}>
          <Spin size="large" />
        </div>
      ) : (
        <Chart {...chartProps} />
      )}
    </div>
  );
};

export default App;
