import { Button, Col, Row, Typography } from 'antd';
import _ from 'lodash';

import { STATUS, SETTINGS } from 'src/constants';

import styles from './settings.module.scss';
import Slider from './Slider';

const { Title } = Typography;

const getSliderProps = (settings, value, onChange) => ({
  ..._.pick(settings, ['min', 'max', 'step']),
  value,
  onChange,
});

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

  const totalUserProps = getSliderProps(SETTINGS.TOTAL_USERS, totalUsers, setTotalUsers);

  const newlyRegisteredUserRateProps = getSliderProps(
    SETTINGS.NEWLY_REGISTERED_USER_RATE,
    newlyRegisteredUserRate,
    setNewlyRegisteredUserRate,
  );

  const visitPerDaysProps = getSliderProps(SETTINGS.VISIT_PER_DAYS, visitPerDays, setVisitPerDays);

  const tokenExpiresInDaysProps = getSliderProps(
    SETTINGS.TOKEN_EXPIRES_IN_DAYS,
    tokenExpiresInDays,
    setTokenExpiresInDays,
  );

  const sessionExpiresInDaysProps = getSliderProps(
    SETTINGS.SESSION_EXPIRES_IN_DAYS,
    sessionExpiresInDays,
    setSessionExpiresInDays,
  );

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
