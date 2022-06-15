import { BrowserRouter } from "react-router-dom";
import { Router } from "./router/Router";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
};
