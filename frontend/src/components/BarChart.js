import { useState, useEffect } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAccount } from "../containers/hooks/useAccount";
import { getBarChartData } from "../utils/getBarChartData";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChart() {
  const { accountData } = useAccount();
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear())
  const barData = getBarChartData(accountData, year);
  const years = []

  for (let i = 2000; i < 2100; i++){
    years.push(i);
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Monthly Bar Chart Analysis</h2>
        <FormControl fullWidth>
            <InputLabel id="analysis-year">Year</InputLabel>
            <Select
              labelId="year"
              id="year"
              value={year}
              label="Year"
              onChange={handleYearChange}
            >
              {years.map((yr) => (
                <MenuItem value={yr} key={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
        </FormControl>
      <div>
        <Bar
          data={barData}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              y:{
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
            },
            legend: {
              labels: {
                fontSize: 20,
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
export default BarChart;
