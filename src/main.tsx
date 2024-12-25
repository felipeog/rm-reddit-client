import "./index.css";
import { ApiContextProvider } from "./api/ApiContextProvider";
import { App } from "./App";
import { BoardContextProvider } from "./context/BoardContextProvider";
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ApiContextProvider>
      <BoardContextProvider>
        <App />
      </BoardContextProvider>
    </ApiContextProvider>
  </React.StrictMode>
);
