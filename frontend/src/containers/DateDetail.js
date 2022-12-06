import { useAccount } from "./hooks/useAccount";
import DataTable from "../components/DataTable";

const DateDetail = ({currentDate}) =>{
    const {incomeData, expenseData} = useAccount();
    const sameDate_Income = incomeData.filter((item) => {
        if(item.time === currentDate){
            return item;
        }
        else{ return null }
    })
    const sameDate_Expense = expenseData.filter((item) => {
        if(item.time === currentDate){
            return item;
        }
        else{ return null }
    })
    const sameDateData = sameDate_Income.concat(sameDate_Expense);

    return (
        <>
            {
                sameDateData.length !== 0 ? 
                <DataTable data={sameDateData} />
                : <div>No data on this date...</div>
            }
        </>
        
    )
}

export default DateDetail;