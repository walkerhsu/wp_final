import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "../../components/DataTable";

import { useAccount } from "../hooks/useAccount";

const paperStyle = {
  padding: 20,
}


const ClassificationPage = () => {
  const { accountData, categories } = useAccount();
  const [value, setValue] = useState("Income");

  const filterData = (category) => {
    return accountData.filter((data) => data.category === category);
  };
  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Paper style={paperStyle}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="show income-expense tabs"
            >
              {categories.map((category) => (
                <Tab label={category} value={category} />
              ))}
            </TabList>
          </Box>
          {categories.map((category) => (
            <TabPanel value={category}>
              {filterData(category).length !== 0 ? (
                <DataTable
                  title={`Your ${category} Data`}
                  data={filterData(category)}
                />
              ) : (
                <div>No {category} data...</div>
              )}
            </TabPanel>
          ))}
        </TabContext>
      </Paper>
    </Box>
  );
};
export default ClassificationPage;
