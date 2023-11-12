import { Line } from '@ant-design/plots';

const Chart = ({ data, config }) => {
  const props = {
    data,
    xField: 'day',
    yField: 'value',
    height: 500,
    ...config,
  };

  return <Line {...props} />;
};

export default Chart;
