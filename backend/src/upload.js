import itemModel from "./models/item.js";
import userModel from "./models/user.js";

const example = [
  {
    id: "1",
    username:"R",
    name: "brunch",
    money: 1000,
    time: new Date("2022-12-05T07:00:00.360Z").getTime(),
    category: "Food",
    subCategory: "Dinner",
    description: "Too expensive.",
  },
  {
    id: "2",
    username:"R",
    name: "MRT",
    money: 30,
    time: new Date("2022-12-05T08:30:00.360Z").getTime(),
    category: "Transport",
    subCategory: "Public Transportation",
    description: "Go to school.",
  },
  {
    id: "3",
    username:"R",
    name: "protection money",
    money: 1000,
    time: new Date("2022-12-05T12:00:00.360Z").getTime(),
    category: "Others",
    subCategory: "Others",
    description: "",
  },
  {
    id: "4",
    username:"R",
    name: "ointment",
    money: 100,
    time: new Date("2022-12-05T15:00:00.360Z").getTime(),
    category: "Health",
    subCategory: "Doctor",
    description: "I broke my leg on my way home QQ.",
  },
  {
    id: "5",
    username: "R",
    name: "salary",
    money: 2000,
    time: new Date("2022-12-06T19:00:00.360Z").getTime(),
    category: "Income",
    subCategory: "Salary",
    description: "Math tutor.",
  },
];

const dataInit = async () => {
  await itemModel.deleteMany({});
  await userModel.deleteMany({});
  await itemModel.insertMany(example);
  console.log("Database initialized!");
};

export { dataInit };
