import { Col, InputNumber, Row, Slider, Typography } from 'antd';
import _ from 'lodash';

import { TOTAL_USERS } from 'src/constants';

import styles from './settings.module.scss';

const { Text } = Typography;

const Controller = ({ totalUsers, setTotalUsers }) => {
  console.log('Controller!!', {
    totalUsers,
  });

  const onChange = _.debounce((value) => {
    setTotalUsers(value);
  }, 300);

  const props = {
    min: TOTAL_USERS.MIN,
    max: TOTAL_USERS.MAX,
    defaultValue: totalUsers,
    onChange,
  };

  return (
    <Row className={styles.root}>
      <Col sm={24} md={12}>
        <Row>
          <Col span={24}>
            <Text strong>Total Users</Text>
          </Col>
          <Col span={18}>
            <Slider {...props} value={totalUsers} />
          </Col>
          <Col span={6}>
            <InputNumber {...props} value={totalUsers} />
          </Col>
        </Row>
      </Col>

      <Col sm={24} md={12}>
        <Row>
          <Col span={24}>
            <Text strong>Newly Registered User Rate</Text>
          </Col>
          <Col span={18}>
            <Slider min={0} max={20} value={0} />
          </Col>
          <Col span={6}>
            <InputNumber min={0} max={20} value={0} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Controller;
