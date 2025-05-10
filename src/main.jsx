import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MovieProvider } from './context/MovieContext.context.jsx';
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </StrictMode>
);
