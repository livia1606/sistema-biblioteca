import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/global.css";
import "./styles/login.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";
import "./styles/crud.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);