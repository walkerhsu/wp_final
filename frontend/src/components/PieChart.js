import { useEffect, useState } from "react";
import { 
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAccount } from "../containers/hooks/useAccount";
import { getPieChartData } from "../utils/getPieChartData";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

function PieChart() {
  const { accountData } = useAccount();
  const date = new Date();
  const [ mode , setMode ] = useState(0);
  const [ time , setTime ] = useState(date.getFullYear());
  const chartData = getPieChartData(accountData, mode, time);
  const modes = ["Year", "Month"]
  const [times, setTimes] = useState([])

  useEffect(() => {
    const ts = [];
    for (let i = 2000; i < 2100; i++){
      ts.push(i);
    }
    setTimes(ts);
  },[])

  const handleModeChange = (event) => {
    const ts = []
    if(event.target.value === "Year"){
      setMode(0)
      setTime(date.getFullYear());
      for (let i = 2000; i < 2100; i++){
        ts.push(i);
      }
      setTimes(ts);
    }else{
      setMode(1)
      setTime(date.getFullYear() + "/" + (date.getMonth()));
      for(let i = date.getFullYear() - 5; i <= date.getFullYear() + 5; i++){
        for (let j = 0; j < 12; j++){
          ts.push({ year: i, month: j });
        }
      }
      setTimes(ts)
      console.log(ts.map((i) => {
        console.log(i.year, i.month)
      }))
    }
  }

  const handleTimeChange = (event) => {
    console.log(event.target.value)
    setTime(event.target.value)
  }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
          <FormControl fullWidth>
            <InputLabel id="analysis-mode">Time Range</InputLabel>
            <Select
              labelId="mode"
              id="mode"
              value={modes[mode]}
              label="Mode"
              onChange={handleModeChange}
            >
              {modes.map((m) => (
                <MenuItem value={m} key={m}>
                {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl >
          <FormControl fullWidth>
            <InputLabel id="analysis-time">Time</InputLabel>
            <Select
              labelId="time"
              id="time"
              value={time}
              label="Time"
              onChange={handleTimeChange}
            >
              {times.map((t) => (
                <MenuItem value={ mode ? t.year + "/" + t.month : t} key={mode ? t.year + "/" + (t.month + 1) : t}>
                { mode ? t.year + "/" + (t.month + 1) : t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
