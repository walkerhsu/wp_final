import { createContext, useContext, useState} from "react"
import React from "react";
const AccountContext = createContext({
    me: {},
    accountData: {},

    setMe: () =>{},
    setAccountData: () => {},
});
const AccountProvider = (props) => {
    const [me, setMe] = useState('');
    const [accountData, setAccountData] = useState([]);
    return (
        <AccountContext.Provider value={
            {me, accountData, setMe, setAccountData}
        } {...props} />
    );
}
const useAccount = () => useContext(AccountContext);
export {AccountProvider, useAccount};