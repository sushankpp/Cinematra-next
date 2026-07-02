"use client";
import {
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const SubscriberChart = ({
  data,
}: {
  data: { day: string; new_subs: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
        <XAxis dataKey="day" type="category" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis dataKey="new_subs" type="number" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#18181b", border: "1px solid #333", borderRadius: 8 }}
          labelStyle={{ color: "#999" }}
        />
        <Scatter data={data} dataKey="new_subs" fill="#22c55e" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};