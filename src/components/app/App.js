import { Typography, Spin } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import Chart from 'src/components/chart';
import Settings from 'src/components/settings';
import {
  DAYS_SPAN_PER_TICK,
  LAST_SEEN_WITHIN_DAYS,
  LOOKAHEAD_DAYS,
  REFRESH_STRATEGIES,
  SESSION_EXPIRES_IN_DAYS,
  SETTINGS,
  STATUS,
} from 'src/constants';
import User from 'src/models/user';

import styles from './App.module.scss';

const today = dayjs();

const initializeUsers = ({ totalUsers, newlyRegisteredUserRate }) => {
  const users = [];
  const counterpartUsers = [];

  for (let i = 0; i < totalUsers; i++) {
    const lastSeenAtDay = today.subtract(_.random(LAST_SEEN_WITHIN_DAYS), 'day');
    const lastSeenAt = lastSeenAtDay.valueOf();
    const isNewlyRegistered = _.random(1, true) <= newlyRegisteredUserRate;

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
    const counterpartUser = new User({ ...attrs, tokenExpiresInDays: 2, sessionExpiresInDays: 80 });

    users.push(user);
    counterpartUsers.push(counterpartUser);
  }

  return { users, counterpartUsers };
};

const chartDataGenerator =
  ({ users, visitPerDays, refreshStrategy }) =>
  (day) => {
    const dayDiff = day.diff(today, 'day');

    if (dayDiff > 0) {
      users.forEach((user) => {
        // Simulate a user visit
        if (_.random(visitPerDays) === 0) {
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
  const [chartData, setChartData] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  const [newlyRegisteredUserRate, setNewlyRegisteredUserRate] = useState(SETTINGS.NEWLY_REGISTERED_USER_RATE.default);
  const [sessionExpiresInDays, setSessionExpiresInDays] = useState(SETTINGS.SESSION_EXPIRES_IN_DAYS.default);
  const [tokenExpiresInDays, setTokenExpiresInDays] = useState(SETTINGS.TOKEN_EXPIRES_IN_DAYS.default);
  const [totalUsers, setTotalUsers] = useState(SETTINGS.TOTAL_USERS.default);
  const [visitPerDays, setVisitPerDays] = useState(SETTINGS.VISIT_PER_DAYS.default);

  useEffect(() => {
    if (status !== STATUS.IDLE) {
      return;
    }

    setStatus(STATUS.RUNNING);

    const { users, counterpartUsers } = initializeUsers({
      totalUsers,
      newlyRegisteredUserRate,
    });
    const genDataWithExistingRefreshStrategy = chartDataGenerator({
      users,
      visitPerDays,
      refreshStrategy: REFRESH_STRATEGIES.EXISTING,
    });
    const genDataWithNewRefreshStrategy = chartDataGenerator({
      users: counterpartUsers,
      visitPerDays,
      refreshStrategy: REFRESH_STRATEGIES.NEW,
    });
    const data = [];

    for (let i = 0; i <= LOOKAHEAD_DAYS; i++) {
      const day = today.add(i, 'day');
      data.push(genDataWithExistingRefreshStrategy(day));
      data.push(genDataWithNewRefreshStrategy(day));
    }

    setChartData(data);

    _.delay(() => {
      setStatus(STATUS.DONE);
    }, 2000);
  }, [status, totalUsers, newlyRegisteredUserRate, visitPerDays]);

  const settingsProps = {
    newlyRegisteredUserRate,
    sessionExpiresInDays,
    setNewlyRegisteredUserRate,
    setSessionExpiresInDays,
    setStatus,
    setTokenExpiresInDays,
    setTotalUsers,
    setVisitPerDays,
    status,
    tokenExpiresInDays,
    totalUsers,
    visitPerDays,
  };

  const chartProps = {
    data: chartData,
    config: {
      xAxis: {
        tickCount: LOOKAHEAD_DAYS / DAYS_SPAN_PER_TICK + 1,
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
