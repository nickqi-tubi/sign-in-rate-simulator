import { Col, InputNumber, Row, Slider as AntSlider, Typography } from 'antd';

const { Text } = Typography;

const Slider = ({ text, ...props }) => (
  <Col xs={24} md={12}>
    <Row gutter={[8, 0]}>
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
