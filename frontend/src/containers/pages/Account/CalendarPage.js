import React from "react";
import { useState } from "react";

import DayCalendar from "../../../components/DayCalendar";
import WeekCalendar from "../../../components/WeekCalendar";
import MonthCalendar from "../../../components/MonthCalendar"
import DateDetail from "../../DateDetail";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import "../../../css/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(null);
  const [showDateDetail, setShowDateDetail] = useState(false);
  const [value,setValue] = useState(0);

  const showDetailsHandle = (dateStr) => {
    console.log("in showDetailsHandle", dateStr)
    setDate(dateStr);
    setShowDateDetail(true);
  };

  const tabHandleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className="CalendarTabView">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={tabHandleChange} className="TabColor"> 
            <Tab label="Day"/>
            <Tab label="Week"/>
            <Tab label="Month"/>
          </Tabs>
        </Box>
      </Box>
      {value === 0 ? 
        <div className="WeekCalendar">
          <h2>Daily Calendar</h2>
          <DayCalendar/>
        </div> :
        value === 1 ? 
          <div className="WeekCalendar">
            <h2>Week Calendar</h2>
            <WeekCalendar showDetailsHandle={showDetailsHandle} />
            <br />
            <div>{date}</div>
            <br />
            {showDateDetail ? <DateDetail currentDate={date} /> : null}
          </div> :
          <div className="WeekCalendar">
            <h2>Month Calendar</h2>
            <MonthCalendar/>
          </div>
      }
    </div>
  );
};

export default CalendarPage;
