import React, { useEffect } from "react";
import { useAccount } from "../../hooks/useAccount";
import { useQuery } from "@apollo/client";

import { GET_ITEMS_QUERY } from '../../../graphql/query';
import {
  ITEM_CREATED_SUBSCRIPTION,
  ITEM_UPDATED_SUBSCRIPTION,
  ITEM_DELETED_SUBSCRIPTION,
} from '../../../graphql/subscriptions';

import DataTable from "../../../components/DataTable";

import "../../../css/AccountMainPage.css";

const AccountMainPage = () => {
  const { accountData, setAccountData } = useAccount();

  const {
    loading, error, data: itemsData, subscribeToMore,
  } = useQuery(GET_ITEMS_QUERY);

  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const item = subscriptionData.data.itemCreated;
          return {
            items: [item, ...prev.items],
          };
        },
      });
    },
    [subscribeToMore],
  );

  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedItem = subscriptionData.data.itemUpdated;
          return {
            items: prev.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
          };
        },
      });
    },
    [subscribeToMore],
  );
  
  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_DELETED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            items: prev.items.map((item) => (item.id === subscriptionData.data.itemDeleted ? {} : item))
          };
        },
      });
    },
    [subscribeToMore],
  );

  useEffect(() => {
    if(itemsData !== undefined) setAccountData(itemsData.items)
  },[itemsData])

  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :(</p>);
  }

  return (
    <div>
      <DataTable title={"Your Recent Data"} data={accountData} />
    </div>
  );
};
export default AccountMainPage;
