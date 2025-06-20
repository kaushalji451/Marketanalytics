import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Rbchart = ({ data }) => {
  // Step 1: Filter out competitor data
  const ourData = data.filter((item) => item.isCompetitor === false);

  // Step 2: Group by date and aggregate
  const groupedData = {};
  ourData.forEach((entry) => {
    const date = entry.date;
    if (!groupedData[date]) {
      groupedData[date] = {
        date: date,
        impressions: 0,
        clicks: 0,
        conversions: 0,
      };
    }

    groupedData[date].impressions += Number(entry.impressions);
    groupedData[date].clicks += Number(entry.clicks);
    groupedData[date].conversions += Number(entry.conversions);
  });

  const chartData = Object.values(groupedData);

  return (
    <div className="pb-1">
      <h1 className="font-bold text-center text-2xl pt-4">Conversions</h1>
      <div className="w-full h-[300px]">
        {" "}
        {/* Set height via a wrapper div */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 30, right: 30, left: 0, bottom: -30 }}
          >
            <defs>
              <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClick" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={({ x, y, payload, index }) => {
                // Show only first and last date on X-axis
                if (index === 0 || index === chartData.length - 1) {
                  return (
                    <text x={x} y={y + 15} textAnchor="middle" fill="#666">
                      {payload.value}
                    </text>
                  );
                }
                return null; // Hide other ticks
              }}
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorImpression)"
              name="Impressions"
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorClick)"
              name="Clicks"
            />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="#ffc658"
              fillOpacity={1}
              fill="url(#colorConversion)"
              name="Conversions"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rbchart;
