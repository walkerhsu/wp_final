import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import reportWebVitals from './reportWebVitals';

import { AccountProvider } from './containers/hooks/useAccount';
import App from './App';
import './index.css';

const HTTP_URI = 
  process.env.NODE_ENV === "production"
    ? '/graphql'
    : 'http://localhost:4000/graphql'

const WS_URL = 
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^http/, "ws")
    : 'ws://localhost:4000/graphql'

const httpLink = new HttpLink({
  uri: HTTP_URI
});

const wsLink = new GraphQLWsLink(createClient({
  url: WS_URL,
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AccountProvider>
        <App />
      </AccountProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
