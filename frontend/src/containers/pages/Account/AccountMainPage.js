import React from "react";
import { useAccount } from "../../hooks/useAccount";

import DataTable from "../../../components/DataTable";

import "../../../css/AccountMainPage.css";


const AccountMainPage = () => {
  const {accountData} = useAccount();

  

  return (
    <div>
      <DataTable title={"Your Recent Data"} data={accountData} />
    </div>
  );
};
export default AccountMainPage;
