import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} SmartExcel JSON Parser. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    color: "#333",
  },
};

export default Footer;
