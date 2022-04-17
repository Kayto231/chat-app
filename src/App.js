import React from "react";
import AppRouter from "./components/AppRouter/AppRouter.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='wrapper'>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
