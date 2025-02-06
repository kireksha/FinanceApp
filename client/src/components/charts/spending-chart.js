import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Продукты", value: 400 },
  { name: "Квартплата", value: 300 },
  { name: "Спорт", value: 300 },
  { name: "Здоровье", value: 200 },
  { name: "Развлечения", value: 278 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

export const SpendingChart = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};
