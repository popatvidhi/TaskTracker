import React from 'react';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const StatisticsPanel = ({ data }) => {
  if (!data) return null;
  return (
    <div className="statistics-panel">
      <PolarArea data={data} />
    </div>
  );
};

export default StatisticsPanel;
