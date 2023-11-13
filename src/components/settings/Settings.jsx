import { Button, Col, Row, Typography } from 'antd';
import _ from 'lodash';

import { STATUS, SETTINGS } from 'src/constants';

import styles from './settings.module.scss';
import Slider from './Slider';

const { Title } = Typography;

const Settings = ({
  newlyRegisteredUserRate,
  setNewlyRegisteredUserRate,
  setStatus,
  setTotalUsers,
  setVisitPerDays,
  status,
  totalUsers,
  visitPerDays,
  sessionExpiresInDays,
  setSessionExpiresInDays,
  tokenExpiresInDays,
  setTokenExpiresInDays,
}) => {
  const onButtonClick = () => {
    setStatus(STATUS.IDLE);
  };

  const totalUserProps = {
    ..._.pick(SETTINGS.TOTAL_USERS, ['min', 'max', 'step']),
    value: totalUsers,
    onChange: setTotalUsers,
  };

  const newlyRegisteredUserRateProps = {
    ..._.pick(SETTINGS.NEWLY_REGISTERED_USER_RATE, ['min', 'max', 'step']),
    value: newlyRegisteredUserRate,
    onChange: setNewlyRegisteredUserRate,
  };

  const visitPerDaysProps = {
    ..._.pick(SETTINGS.VISIT_PER_DAYS, ['min', 'max', 'step']),
    value: visitPerDays,
    onChange: setVisitPerDays,
  };

  const tokenExpiresInDaysProps = {
    ..._.pick(tokenExpiresInDays, ['min', 'max', 'step']),
    value: tokenExpiresInDays,
    onChange: setTokenExpiresInDays,
  };

  const sessionExpiresInDaysProps = {
    ..._.pick(sessionExpiresInDays, ['min', 'max', 'step']),
    value: sessionExpiresInDays,
    onChange: setSessionExpiresInDays,
  };

  return (
    <Row className={styles.root} gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Update Simulation Varaibles</Title>
      </Col>
      <Slider text="Total Users" {...totalUserProps} />
      <Slider text="Newly Registered User Rate" {...newlyRegisteredUserRateProps} />
      <Slider text="Average Visit Frequency Per Days" {...visitPerDaysProps} />

      <Col span={24}>
        <Title level={3}>Adjust Refresh Strategies</Title>
      </Col>
      <Slider text="Shorten accessToken Expiration Days" {...tokenExpiresInDaysProps} />
      <Slider text="Extend Redis Session Expiration Days" {...sessionExpiresInDaysProps} />

      <Col span={24}>
        <Button type="primary" onClick={onButtonClick} loading={status === STATUS.RUNNING}>
          Calculate
        </Button>
      </Col>
    </Row>
  );
};

export default Settings;
