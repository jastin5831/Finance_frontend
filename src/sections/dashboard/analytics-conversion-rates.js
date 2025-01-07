import { useEffect, useState, useRef } from 'react';
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

export default function AnalyticsConversionRates({ chart }) {
  const [chartData, setChartData] = useState({
    name: nameArr,
    value: valueArr,
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const tempData = { name: [], value: [] };
    if (Array.isArray(chart) && chart.length > 0) {
      chart.forEach((item) => {
        tempData.name.push(item.year.toString());
        tempData.value.push(item.value);
      });
      setChartData(tempData);
    }
  }, [chart]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ChartContainer
          height={dimensions.height}
          width={dimensions.width}
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
      )}
    </div>
  );
}

AnalyticsConversionRates.propTypes = {
  chart: PropTypes.array,
};
