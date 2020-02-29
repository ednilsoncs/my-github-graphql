import React from "react";
import { hot } from "react-hot-loader";
import { ApolloProvider } from "react-apollo";
import AppRoutes from "./routes";
import apolloClient from "./services/apollo";

function App() {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <AppRoutes />
      </ApolloProvider>
    </>
  );
}
export default hot(module)(App);
