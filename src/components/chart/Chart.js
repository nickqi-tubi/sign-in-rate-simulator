import { Line } from '@ant-design/plots';

const Chart = ({ data, config }) => {
  if (!data.length) {
    return null;
  }

  const baselineUserNum = data[0].value;

  const formatter = (num) => `${((num / baselineUserNum) * 100).toFixed(2)}%`;

  const props = {
    data,
    xField: 'day',
    yField: 'value',
    height: 500,
    seriesField: 'refreshStrategy',
    meta: {
      value: {
        min: Math.min(...data.map((d) => d.value)),
      },
    },
    yAxis: {
      label: {
        formatter,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: datum.refreshStrategy,
        value: `${datum.value.toLocaleString('en-US')} / ${baselineUserNum.toLocaleString('en-US')} = (${formatter(
          datum.value,
        )})`,
      }),
    },
    ...config,
  };

  return <Line {...props} />;
};

export default Chart;
