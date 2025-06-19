import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReachImpChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const platformMap = {};

    data.forEach((item) => {
      if (item.isCompetitor) return;
      const platform = item.platform;

      if (!platformMap[platform]) {
        platformMap[platform] = {
          platform,
          impressions: 0,
          reach: 0,
        };
      }

      platformMap[platform].impressions += Number(item.impressions || 0);
      platformMap[platform].reach += Number(item.reach || 0);
    });

    setChartData(Object.values(platformMap));
  }, [data]);

  return (
    <div className="w-full h-[400px] bg-white rounded p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">
        Platform-wise Reach & Impressions
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reach" fill="#8884d8" />
          <Bar dataKey="impressions" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReachImpChart;
