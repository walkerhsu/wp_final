import { useMemo, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAccount } from "../containers/hooks/useAccount";
import DateDetail from "../containers/DateDetail";
import { format } from "date-fns";
import DataTable from "./DataTable";
const localizer = momentLocalizer(moment);

const BigCalendar = ( props ) => {
  const { accountData } = useAccount()
  const [ date, setDate ] = useState(null)
  const [ showDateDetail, setShowDateDetail ] = useState(false);
  const [ showEventDetail, setShowEventDetail ] = useState(false);
  const [ eventdata, setEventData ] = useState([])
  const { views } = useMemo(() => ({
    views: {
        month: true
    }
  }), [])

  useEffect(() => {
    setDate(null)
    setShowDateDetail(false)
    setShowEventDetail(false)
  },[accountData])

  const myEventsList = accountData.map((item) => {
    const date = new Date(item.time);
    return { start: date, end: date, title: item.name }
  })

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={views}
        onSelectSlot={(slotInfo) => {
          setDate(format(slotInfo.start, "yyyy / MM / dd ( ccc )"))
          setShowDateDetail(true)
          setShowEventDetail(false)
        }}
        onSelectEvent={(event) => {
          setDate(format(event.start, "yyyy / MM / dd ( ccc )"))
          setShowDateDetail(false)
          setShowEventDetail(true)
          setEventData(accountData.filter((item) => {
            return (item.time === event.start.getTime() && item.name === event.title)
          }))
        }}
        selectable
        popup={true}
      />
      <br />
      <div>{date}</div>
      <br />
      {showDateDetail ? <DateDetail currentDate={date} /> : 
        showEventDetail ? <DataTable data={eventdata} /> : null
      }
    </div>
  );
};
export default BigCalendar;
