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
        formatter: (num) => `${parseInt((num / baselineUserNum) * 100, 10)}%`,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.refreshStrategy,
        value: `${datum.value.toLocaleString('en-US')} / ${baselineUserNum.toLocaleString('en-US')} = (${(
          (datum.value / baselineUserNum) *
          100
        ).toFixed(2)}%)`,
      }),
    },
    ...config,
  };

  return <Line {...props} />;
};

export default Chart;
