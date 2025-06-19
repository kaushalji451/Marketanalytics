import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { metric: "Followers", value: 7554 },
  { metric: "Reach", value: 2946 },
  { metric: "Impressions", value: 700 },
  { metric: "Clicks", value: 110 },
  { metric: "Conversions", value: 600 },
];

const BarCharts = () => {
  return (
    <div>
      <div className="w-full h-96">
        <ResponsiveContainer width="30%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#8884d8"
              activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
            />

            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
