import { useAccount } from "./hooks/useAccount";
import DataTable from "../components/DataTable";

const DateDetail = ({ currentDate }) => {
  const { accountData } = useAccount();
  
  const sameDateData = accountData.filter((item) => {
    if (item.time === currentDate) {
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
