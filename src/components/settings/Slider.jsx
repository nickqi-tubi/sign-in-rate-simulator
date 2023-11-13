import { Col, InputNumber, Row, Slider as AntSlider, Typography } from 'antd';
import _ from 'lodash';

const { Text } = Typography;

const Slider = ({ text, ...props }) => (
  <Col sm={24} md={12}>
    <Row>
      <Col span={24}>
        <Text strong>{text}</Text>
      </Col>
      <Col span={18}>
        <AntSlider {...props} />
      </Col>
      <Col span={6}>
        <InputNumber {...props} />
      </Col>
    </Row>
  </Col>
);

export default Slider;
