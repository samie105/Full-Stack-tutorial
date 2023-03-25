import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { TodosContextProvider } from "./contexts/todosContext";
import { AuthContextProvider } from "./contexts/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TodosContextProvider>
          <App />
        </TodosContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
