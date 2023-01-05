import React from "react";
import { useState } from "react";

import DayCalendar from "../../../components/DayCalendar";
import WeekCalendar from "../../../components/WeekCalendar";
import MonthCalendar from "../../../components/MonthCalendar";
import DateDetail from "../../DateDetail";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import "../../../css/Calendar.css";

const CalendarPage = () => {
  const [date, setDate] = useState(null);
  const [showDateDetail, setShowDateDetail] = useState(false);
  const [value, setValue] = useState(0);

  const showDetailsHandle = (dateStr) => {
    console.log("in showDetailsHandle", dateStr);
    setDate(dateStr);
    setShowDateDetail(true);
  };

  const tabHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="CalendarTabView">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={tabHandleChange} className="TabColor">
            <Tab label="Day" />
            <Tab label="Week" />
            <Tab label="Month" />
          </Tabs>
        </Box>
      </Box>
      {value === 0 ? (
        <div className="WeekCalendar">
          <div className="CalendarTitle">Day Calendar</div>
          <DayCalendar />
        </div>
      ) : value === 1 ? (
        <div className="WeekCalendar">
          <div className="CalendarTitle">Week Calendar</div>
          <Paper>
            <WeekCalendar showDetailsHandle={showDetailsHandle} />
            <br />
            <div>{date}</div>
            <br />
          </Paper>
          <br />
          {showDateDetail ? <DateDetail currentDate={date} /> : null}
        </div>
      ) : (
        <div className="WeekCalendar">
          <div className="CalendarTitle">Month Calendar</div>
          <MonthCalendar />
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
