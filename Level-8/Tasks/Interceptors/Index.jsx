import React from "react";
import ReactDOM from "react-dom";
import AxiosInterceptorProvider from "./AxInter";
import App from "./App";

ReactDOM.render(
  <AxiosInterceptorProvider>
    <App />
  </AxiosInterceptorProvider>,
  document.getElementById("root")
);
