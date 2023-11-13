import { Button, Col, InputNumber, Row, Slider, Typography } from 'antd';

import { TOTAL_USERS } from 'src/constants';

import styles from './settings.module.scss';

const { Text } = Typography;

const Controller = ({ isCalculating, setIsCalculating, totalUsers, setTotalUsers }) => {
  const onButtonClick = () => {
    setIsCalculating(true);
  };

  const onChange = (value) => {
    setTotalUsers(value);
  };

  const props = {
    min: TOTAL_USERS.MIN,
    max: TOTAL_USERS.MAX,
    value: totalUsers,
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
            <Slider {...props} />
          </Col>
          <Col span={6}>
            <InputNumber {...props} />
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

      <Col span={24}>
        <Button type="primary" onClick={onButtonClick} loading={isCalculating}>
          Calculate
        </Button>
      </Col>
    </Row>
  );
};

export default Controller;
