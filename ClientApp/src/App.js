import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cars from "./components/Cars";
import Confirmation from "./components/Confirmation";
import User from "./components/User";
import Summary from "./components/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/user" element={<User />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/reservation" element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
