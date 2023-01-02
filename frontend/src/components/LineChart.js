import { useState } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAccount } from "../containers/hooks/useAccount";
import { getLineChartData } from "../utils/getLineChartData"

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LineChart() {
  const { accountData } = useAccount();
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear())
  const lineData = getLineChartData(accountData, year);
  const years = []

  for (let i = 2000; i < 2100; i++){
    years.push(i);
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Monthly Line Chart Analysis</h2>
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
        <Line
          data={lineData}
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
export default LineChart;
