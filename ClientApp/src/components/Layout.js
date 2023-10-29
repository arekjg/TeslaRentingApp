import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="header">
        <Navigation />
      </header>
      <section className="content">
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
