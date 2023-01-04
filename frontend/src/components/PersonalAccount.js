import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import FaceIcon from "@mui/icons-material/Face";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import PinIcon from "@mui/icons-material/Pin";
import MailIcon from "@mui/icons-material/Mail";

import { GET_ACCOUNT_QUERY, USER_UPDATED_SUBSCRIPTION } from "../graphql";
import { useAccount } from "../containers/hooks/useAccount";
import Account from "./Account";

export default function PersonalAccountList({ handleOnClick }) {
  const { me } = useAccount();
  const { loading, error, data, subscribeToMore } = useQuery(GET_ACCOUNT_QUERY, {
    variables: { username: me },
  });
  const [personalData, setPersonalData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      //   setPage("PersonalAccount");
      setPersonalData([
        {
          title: "name",
          icon: <FaceIcon sx={{ fontSize: "50px" }} />,
          value: data.account.username,
          handleCLick: () => handleOnClick("ChangeName"),
        },
        {
          title: "password",
          icon: <EnhancedEncryptionIcon sx={{ fontSize: "50px" }} />,
          handleCLick: () => handleOnClick("ChangePassword"),
        },
        {
          title: "hint",
          icon: <PinIcon sx={{ fontSize: "50px" }} />,
          value: data.account.hint,
          handleCLick: () => handleOnClick("ChangeHint"),
        },
        {
          title: "email",
          icon: <MailIcon sx={{ fontSize: "50px" }} />,
          value: data.account.email,
          handleCLick: () => handleOnClick("ChangeEmail"),
        },
      ]);
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
    
    useEffect(() => {
        subscribeToMore({
            document: USER_UPDATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { userUpdated } = subscriptionData.data;
                console.log(userUpdated);
                setPersonalData([
                    {
                        title: "name",
                        icon: <FaceIcon sx={{ fontSize: "50px" }} />,
                        value: userUpdated.username,
                        handleCLick: () => handleOnClick("ChangeName"),
                    },
                    {
                        title: "password",
                        icon: <EnhancedEncryptionIcon sx={{ fontSize: "50px" }} />,
                        handleCLick: () => handleOnClick("ChangePassword"),
                    },
                    {
                        title: "hint",
                        icon: <PinIcon sx={{ fontSize: "50px" }} />,
                        value: userUpdated.hint,
                        handleCLick: () => handleOnClick("ChangeHint"),
                    },
                    {
                        title: "email",
                        icon: <MailIcon sx={{ fontSize: "50px" }} />,
                        value: userUpdated.email,
                        handleCLick: () => handleOnClick("ChangeEmail"),
                    },
                ]);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribeToMore])

  if (loading) return <h1>Loading</h1>;
  else if (error) return <h1>Error :(</h1>;
  else return <Account personalData={personalData} />;
}
