import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAccount } from "../containers/hooks/useAccount";
import { getPieChartData } from "../utils/getPieChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const { accountData } = useAccount();
  const chartData = getPieChartData(accountData);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <div>
        <Pie
          data={chartData}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
export default PieChart;
