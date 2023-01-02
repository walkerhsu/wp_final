import React from "react";
import { 
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useAccount } from "../containers/hooks/useAccount";
import { getPieChartData } from "../utils/getPieChartData";
import { getBarChartData } from "../utils/getBarChartData";



ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function PieChart() {
  const { accountData } = useAccount();
  const chartData = getPieChartData(accountData);
  const barData = getBarChartData(accountData);
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
      <h2 style={{ textAlign: "center" }}>Monthly Analysis</h2>
      <div>
        <Bar
          data={barData}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
/*data={{
            // Name of the variables on x-axies for each bar
            labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1552, 1319, 613, 1400],
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }} */
export default PieChart;
