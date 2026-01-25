import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <AuthProvider>
   <RouterProvider router={App} />
   </AuthProvider>
  </React.StrictMode>
);
