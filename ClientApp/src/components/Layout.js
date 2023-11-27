import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <header className="header">
        <Navigation />
      </header>
      <section className="content">
        <Outlet />
      </section>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
