import { useState } from "react";
import { format, subDays, addDays } from "date-fns";
import DateDetail from "../containers/DateDetail";
import Paper from "@material-ui/core/Paper";

const DayCalendar = ({ showDetailsHandle }) => {
  const [day, setDay] = useState(new Date());

  const changeDayHandle = (btnType) => {
    if (btnType === "prev") {
      setDay(subDays(day, 1));
    }
    if (btnType === "next") {
      setDay(addDays(day, 1));
    }
  };

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeDayHandle("prev")}>
            prev day
          </div>
        </div>
        <div className="col col-center">
          <span>{format(day, "yyyy / MM / dd ( ccc )")}</span>
        </div>
        <div className="col col-end" onClick={() => changeDayHandle("next")}>
          <div className="icon">next day</div>
        </div>
      </div>
    );
  };
  const renderDay = () => {
    return <DateDetail currentDate={format(day, "yyyy / MM / dd ( ccc )")} />;
  };
  return (
    <div>
      <div className="calendar">
        <Paper>{renderHeader()}</Paper>
      </div>
      <br></br>
      {renderDay()}
    </div>
  );
};

export default DayCalendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */
