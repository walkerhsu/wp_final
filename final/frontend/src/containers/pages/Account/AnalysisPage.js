import { useState } from 'react';
import BarChart from '../../../components/BarChart';
import LineChart from '../../../components/LineChart';
import PieChart from '../../../components/PieChart';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const AnalyticsPage = () => {
  const [value,setValue] = useState(0);

  const tabHandleChange = (event,newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={tabHandleChange}>
            <Tab label="PieChart"/>
            <Tab label="BarChart"/>
            <Tab label="LineChart"/>
          </Tabs>
        </Box>
      </Box>
      {value === 0 ? <PieChart /> : 
        value === 1 ? <BarChart /> : <LineChart />
      }
    </div>

  );
};

export default AnalyticsPage;
