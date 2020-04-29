import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
export default Index;
