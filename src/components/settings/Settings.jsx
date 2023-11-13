import { Button, Col, Row } from 'antd';
import _ from 'lodash';

import { TOTAL_USERS, STATUS } from 'src/constants';

import styles from './settings.module.scss';
import Slider from './Slider';

const Controller = ({ status, setStatus, totalUsers, setTotalUsers }) => {
  const onButtonClick = () => {
    setStatus(STATUS.IDLE);
  };

  const onChange = (value) => {
    setTotalUsers(value);
  };

  const totalUserProps = {
    ..._.pick(TOTAL_USERS, ['min', 'max', 'step']),
    value: totalUsers,
    onChange,
  };

  const userRateProps = {};

  return (
    <Row className={styles.root} gutter={[16, 16]}>
      <Slider text="Total Users" {...totalUserProps} />

      <Slider text="Newly Registered User Rate" {...userRateProps} />

      <Col span={24}>
        <Button type="primary" onClick={onButtonClick} loading={status === STATUS.RUNNING}>
          Calculate
        </Button>
      </Col>
    </Row>
  );
};

export default Controller;
