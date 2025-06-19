import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevinueChart = ({ data }) => {
  const aggregated = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i].isCompetitor === false) {
      const platform = data[i].platform.toLowerCase();

      if (!aggregated[platform]) {
        aggregated[platform] = {
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          reach: 0,
          conversions: 0,
          spend: 0,
          revenue: 0,
        };
      }

      aggregated[platform].reach += Number(data[i].reach);
      aggregated[platform].conversions += Number(data[i].conversions);
      aggregated[platform].spend += Number(data[i].spend);
      aggregated[platform].revenue += Number(data[i].revenue);
    } else {
      continue;
    }
  }

  const radarData = Object.values(aggregated).map((entry) => {
    const roi = ((entry.revenue - entry.spend) / entry.spend) * 100;
    return {
      platform: entry.platform,
      reach: entry.reach,
      conversions: entry.conversions,
      roi: Math.round(roi),
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold pb-8">ROI</h1>
      <ResponsiveContainer width="100%" aspect={1.5} height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="100%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="platform" />
          <PolarRadiusAxis />
          <Radar
            name="Reach"
            dataKey="reach"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Conversions"
            dataKey="conversions"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Radar
            name="ROI (%)"
            dataKey="roi"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.6}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevinueChart;
