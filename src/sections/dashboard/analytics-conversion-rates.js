import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChartContainer } from '@mui/x-charts/ChartContainer';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

const valueArr = [200, 0, 900, 300, 1200];
const nameArr = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
];

// ----------------------------------------------------------------------

export default function AnalyticsConversionRates({chart}) {
  const [chartData, setChartData] = useState({
    name:nameArr, value:valueArr
  })

  useEffect(() => {
    const tempData = {name:[], value:[]}
    if(Array.isArray(chart) && chart.length >0) {
      chart.forEach(item => {
        tempData.name.push(item.year.toString()); 
        tempData.value.push(item.value)
      })
      setChartData(tempData)
    }
  },[setChartData, chart])

  return (
    <ChartContainer
      width={135}
      height={150}
      xAxis={[{ scaleType: 'point', data: chartData.name }]}
      series={[{ type: 'line', data: chartData.value }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          stroke: '#8884d8',
          strokeWidth: 1,
        },
        [`& .${markElementClasses.root}`]: {
          stroke: '#8884d8',
          scale: '0.5',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
}

AnalyticsConversionRates.propTypes = {
  chart: PropTypes.array,
};
