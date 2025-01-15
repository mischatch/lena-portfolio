import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <App />
  </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
