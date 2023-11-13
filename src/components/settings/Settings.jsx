import { Button, Col, Row, Select, Typography } from 'antd';
import _ from 'lodash';

import { STATUS, SETTINGS, RANDOM_GENERATORS } from 'src/constants';

import styles from './settings.module.scss';
import Slider from './Slider';

const { Link, Text, Title, Paragraph } = Typography;

const getSliderProps = (settings, value, onChange) => ({
  ..._.pick(settings, ['min', 'max', 'step']),
  value,
  onChange,
});

const Settings = ({
  newlyRegisteredUserRate,
  randomVisitGenerator,
  sessionExpiresInDays,
  setNewlyRegisteredUserRate,
  setRandomVisitGenerator,
  setSessionExpiresInDays,
  setStatus,
  setTokenExpiresInDays,
  setTotalUsers,
  setVisitPerDays,
  status,
  tokenExpiresInDays,
  totalUsers,
  visitPerDays,
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

  const randomGeneratorProps = {
    value: randomVisitGenerator,
    options: [
      { value: RANDOM_GENERATORS.LODASH, label: 'Lodash (Uniformly distributed)' },
      { value: RANDOM_GENERATORS.RANDU, label: 'Randu (Uniformly distributed)' },
      { value: RANDOM_GENERATORS.BETA22, label: 'Beta (alpha=2, beta=2)' },
      { value: RANDOM_GENERATORS.BETA25, label: 'Beta (alpha=2, beta=5)' },
    ],
    onChange: setRandomVisitGenerator,
  };

  return (
    <Row className={styles.root} gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Update Simulation Variables</Title>
      </Col>
      <Slider text="Total Users" {...totalUserProps} />
      <Slider text="Newly Registered User Rate" {...newlyRegisteredUserRateProps} />
      <Slider text="Average Visit Frequency Per Days" {...visitPerDaysProps} />
      <Col span={24}>
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Text strong>Random Visit Generator</Text>
            <Paragraph>
              For the differences of pseudorandom number generators, please check{' '}
              <Link
                href="https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/random/base"
                target="_blank"
              >
                https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/random/base
              </Link>
            </Paragraph>
          </Col>
          <Col span={24}>
            <Select {...randomGeneratorProps} />
          </Col>
        </Row>
      </Col>

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
