import "./index.css";
import { App } from "./App.tsx";
import { BoardContextProvider } from "./BoardContext.tsx";
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </React.StrictMode>
);
