import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "../../../components/DataTable";

import { useAccount } from "../../hooks/useAccount";

const paperStyle = {
  width: "97vw",
  padding: 20,
};

const ClassificationPage = () => {
  const { accountData, categories } = useAccount();
  const defaultValue =
    accountData.length !== 0 ? accountData[0].category : "Income";
  const [value, setValue] = useState(defaultValue);

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
          <Box
            sx={{
              maxWidth: { xs: "95vw", sm: "95vw" },
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleTabChange}
              aria-label="show income-expense tabs"
              value={value}
            >
              {categories.map((category) => (
                <Tab
                  label={category.cat}
                  value={category.cat}
                  key={category.cat}
                />
              ))}
            </Tabs>
          </Box>
          {categories.map((category) => (
            <TabPanel value={category.cat} key={category.cat}>
              {filterData(category.cat).length !== 0 ? (
                <DataTable
                  title={`Your ${category.cat} Data`}
                  data={filterData(category.cat)}
                />
              ) : (
                <h1 align="center">No {category.cat} data...</h1>
              )}
            </TabPanel>
          ))}
        </TabContext>
      </Paper>
    </Box>
  );
};
export default ClassificationPage;
