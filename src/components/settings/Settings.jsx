import { Button, Col, Row } from 'antd';
import _ from 'lodash';

import { STATUS, TOTAL_USERS, NEWLY_REGISTERED_USER_RATE } from 'src/constants';

import styles from './settings.module.scss';
import Slider from './Slider';

const Settings = ({
  newlyRegisteredUserRate,
  setNewlyRegisteredUserRate,
  setStatus,
  setTotalUsers,
  status,
  totalUsers,
}) => {
  const onButtonClick = () => {
    setStatus(STATUS.IDLE);
  };

  const totalUserProps = {
    ..._.pick(TOTAL_USERS, ['min', 'max', 'step']),
    value: totalUsers,
    onChange: setTotalUsers,
  };

  const newlyRegisteredUserRateProps = {
    ..._.pick(NEWLY_REGISTERED_USER_RATE, ['min', 'max', 'step']),
    value: newlyRegisteredUserRate,
    onChange: setNewlyRegisteredUserRate,
  };

  return (
    <Row className={styles.root} gutter={[16, 16]}>
      <Slider text="Total Users" {...totalUserProps} />

      <Slider text="Newly Registered User Rate" {...newlyRegisteredUserRateProps} />

      <Col span={24}>
        <Button type="primary" onClick={onButtonClick} loading={status === STATUS.RUNNING}>
          Calculate
        </Button>
      </Col>
    </Row>
  );
};

export default Settings;
