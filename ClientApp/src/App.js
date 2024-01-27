import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cars from "./components/Cars";
import Confirmation from "./components/Confirmation";
import User from "./components/User";
import Summary from "./components/Summary";
import Locations from "./components/Locations";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Settings from "./components/Settings";
import Reservations from "./components/Reservations";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/user" element={<User />} />
            <Route path="/summary" element={<Summary />} />
            <Route
              path="/reservation"
              element={<Confirmation type={"reservation"} />}
            />
            <Route path="/locations" element={<Locations />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/registration"
              element={<Confirmation type={"registration"} />}
            />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/loggedin"
              element={<Confirmation type={"loggedin"} />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reservations" element={<Reservations />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
