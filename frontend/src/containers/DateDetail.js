import { useAccount } from "./hooks/useAccount";
import DataTable from "../components/DataTable";
import dayjs from "../utils/day";

const DateDetail = ({ currentDate }) => {
  const { accountData } = useAccount();
  
  const sameDateData = accountData.filter((item) => {
    if (item.time && dayjs(item.time).format('YYYY / MM / DD ( ddd )') === currentDate) {
      return item;
    } else {
      return null;
    }
  });

  return (
    <>
      {sameDateData.length !== 0 ? (
        <DataTable data={sameDateData} />
      ) : (
        <h1>No data on this date...</h1>
      )}
    </>
  );
};

export default DateDetail;
