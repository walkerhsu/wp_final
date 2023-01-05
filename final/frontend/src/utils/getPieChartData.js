const borderColor = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];
const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
];
const getCategories = (accountData, mode, time) => {
  const categories = [];
  for (let i = 0; i < accountData.length; i++) {
    const date = new Date(accountData[i].time)
    if (!categories.includes(accountData[i].category) && 
      ((mode && date.getFullYear().toString() === time.substring(0,4) && date.getMonth().toString() === time.substring(5)) || 
      (!mode && date.getFullYear() === time))) {
        categories.push(accountData[i].category);
    }
  }
  return categories;
}
const categoryData = (category, accountData, mode, time) => {
  const sameCategoryData = accountData.filter(
    (item) => {
      const date = new Date(item.time)
      return (item.category === category && 
      ((mode && date.getFullYear().toString() === time.substring(0,4) && date.getMonth().toString() === time.substring(5)) || 
      (!mode && date.getFullYear() === time)))
    }
  );
  let sum = 0;
  for (let i = 0; i < sameCategoryData.length; i++) {
    sum += parseInt(sameCategoryData[i].money);
  }
  return sum;
};

export function getPieChartData(accountData, mode, time) {
  const pieData = {
    labels: [],
    datasets: [],
  };
  const categories = getCategories(accountData, mode, time);

  const labels = categories.map((category, index) => ({
    label: category,
    data: categoryData(category, accountData, mode, time),
    backgroundColor: backgroundColor[index % borderColor.length],
    borderColor: borderColor[index % borderColor.length],
  }));

  pieData.labels = labels.map((label) => label.label);
  pieData.datasets = [
    {
      label: "Money",
      data: labels.map((label) => label.data),
      backgroundColor: labels.map((label) => label.backgroundColor),
      borderColor: labels.map((label) => label.borderColor),
      borderWidth: 1,
    },
  ];
  return pieData;
}
