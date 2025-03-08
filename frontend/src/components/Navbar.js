import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2>SmartExcel JSON Parser</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#6A38C2",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Navbar;
