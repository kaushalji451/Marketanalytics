import React from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Colors for each slice
const COLORS = ["#0088FE", "#FF8042"];

const RADIAN = Math.PI / 180;

// Customized label showing percentage
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CampainTypeChart = ({data}) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const campaignTypeCount = data.reduce((acc, item) => {
        if (!item.isCompetitor) {
          acc[item.campaign_type] = (acc[item.campaign_type] || 0) + 1;
        }
        return acc;
      }, {});

      const formattedData = Object.entries(campaignTypeCount).map(
        ([type, count]) => ({
          name: type,
          value: count,
        })
      );

      setPieData(formattedData);
    }
  }, [data]);
  return (
    <div className="w-full  rounded-lg flex justify-center items-center py-6">
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">
          Campaign Type Distribution
        </h2>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CampainTypeChart;
