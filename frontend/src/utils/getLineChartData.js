const monthData = (month, year, accountData) => {
    const sameMonthData = accountData.filter( (item) => {
        const date = new Date(item.time);
        return (date.getMonth() === month && date.getFullYear() === year)
    });
    let rsum = 0;
    let esum = 0;
    for (let i = 0; i < sameMonthData.length; i++) {
        if(sameMonthData[i].category === 'Income')
            rsum += parseInt(sameMonthData[i].money);
        else
            esum += parseInt(sameMonthData[i].money);
    }
    return (rsum - esum);
};
  
export function getLineChartData(accountData, year) {
    const lineData = {
      labels:  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [],
    };
  
    const labels = [];
    for(let i = 0;i < 12; i++){
        labels.push({
            label: i,
            data: monthData(i, year, accountData),
        })
    }
  
    lineData.datasets = [
      {
        label: "Balance",
        data: labels.map((label) => label.data),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#003f5c",
        borderWidth: 1,
      }
    ];
    return lineData;
}
  