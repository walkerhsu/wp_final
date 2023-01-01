import React from "react";
import { useState } from "react";

import WeekCalendar from "../../../components/WeekCalendar";
import DateDetail from "../../DateDetail";

const CalendarPage = () => {
  const [showDateDetail, setShowDateDetail] = useState(false);
  const [date, setDate] = useState(null);

  const showDetailsHandle = (dateStr) => {
    console.log("in showDetailsHandle", dateStr)
    setDate(dateStr);
    setShowDateDetail(true);
  };

  return (
    <div>
      <div className="WeekCalendar">
        <h2>Week Calendar</h2>
        <WeekCalendar showDetailsHandle={showDetailsHandle} />
        <br />
        <div>{date}</div>
        <br />
        {showDateDetail ? <DateDetail currentDate={date} /> : null}
      </div>
    </div>
  );
};

export default CalendarPage;
