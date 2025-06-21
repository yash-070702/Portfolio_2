import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LeetcodeHeatMap = ({ username }) => {
  const [stats, setStats] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/leetcode/${username}`)
  //     .then((res) => res.json())
  //     .then((data) => setStats(data))
  //     .catch((err) => console.error(err));
  // }, [username]);
  useEffect(() => {
  fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
    .then((res) => res.json())
    .then((data) => setStats(data))
    .catch((err) => console.error(err));
}, [username]);


  if (!stats)
    return <p className="text-center text-white">Loading LeetCode stats...</p>;

  const data = [
    { name: "Easy", value: stats.easySolved },
    { name: "Medium", value: stats.mediumSolved },
    { name: "Hard", value: stats.hardSolved },
  ];

  const gradientDefs = (
    <defs>
      <linearGradient id="easyGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#02a908f6" />
        <stop offset="100%" stopColor="#02a908f6" />
      </linearGradient>
      <linearGradient id="mediumGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#b39801f6" />
        <stop offset="100%" stopColor="#b39801f6" />
      </linearGradient>
      <linearGradient id="hardGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
  );

  const colors = [
    "url(#easyGradient)",
    "url(#mediumGradient)",
    "url(#hardGradient)",
  ];

  return (
    <div className="!mt-10">
    <h1 className="text-3xl font-bold text-center text-white mb-6">
      Coding Stats for{" "}
    </h1>
      <div className="!px-50 !w-9/12 !mx-auto  text-white rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div style={{ width: 300, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {gradientDefs}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80} // increased from 80
                outerRadius={120} // decreased from 120
                paddingAngle={3}
                dataKey="value"
                isAnimationActive
                cornerRadius={10}
                label={false}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
                formatter={(value, name) => [`${value} Questions`, name]}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "white" }}>{value}</span>
                )}
              />

              {/* Center label */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={22}
                fontWeight="bold"
                fill="#fff"
              >
                {stats.totalSolved}
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fill="#ccc"
              >
                Questions
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-left space-y-2">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">
            LeetCode Stats for{" "}
            <span className="text-white">{stats.username}</span>
          </h2>
          <p className="text-lg">
            🎯 Total Solved:{" "}
            <span className="font-semibold">{stats.totalSolved}</span>
          </p>
          <p>
            🟢 Easy:{" "}
            <span className="text-green-400 font-medium">
              {stats.easySolved}
            </span>
          </p>
          <p>
            🟡 Medium:{" "}
            <span className="text-yellow-300 font-medium">
              {stats.mediumSolved}
            </span>
          </p>
          <p>
            🔴 Hard:{" "}
            <span className="text-red-400 font-medium">{stats.hardSolved}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeHeatMap;
