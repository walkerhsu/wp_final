const monthData = (month, accountData) => {
    const sameMonthData = accountData.filter( (item) => {
        const date = new Date(item.time);
        return date.getMonth() === month
    });
    let rsum = 0;
    let esum = 0;
    for (let i = 0; i < sameMonthData.length; i++) {
        if(sameMonthData[i].category === 'Income')
            esum += parseInt(sameMonthData[i].money);
        else
            rsum += parseInt(sameMonthData[i].money);
    }
    return [ rsum , esum ];
};
  
export function getBarChartData(accountData) {
    const barData = {
      labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [],
    };
  
    const labels = [];
    for(let i = 0;i < 12; i++){
        labels.push({
            label: i,
            data: monthData(i, accountData),
        })
    }
  
    barData.datasets = [
      {
        label: "Revenue",
        data: labels.map((label) => label.data[0]),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#2f4b7c",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: labels.map((label) => label.data[1]),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#003f5c",
        borderWidth: 1,
      },
    ];
    return barData;
}
  