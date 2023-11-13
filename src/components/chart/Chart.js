import { Line } from '@ant-design/plots';

const Chart = ({ data, config }) => {
  const baselineUserNum = data[0].value;

  const props = {
    data,
    xField: 'day',
    yField: 'value',
    height: 500,
    seriesField: 'refreshStrategy',
    meta: {
      value: {
        max: baselineUserNum,
        min: Math.min(...data.map((d) => d.value)),
      },
    },
    yAxis: {
      label: {
        formatter: (num) => `${(num / baselineUserNum) * 100}%`,
      },
    },
    ...config,
  };

  return <Line {...props} />;
};

export default Chart;
