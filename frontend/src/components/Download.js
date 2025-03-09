import React from "react";
import * as XLSX from "xlsx";

const Download = ({ jsonData }) => {
  const handleDownload = () => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      alert("No data to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, "_"); // Generate timestamp
    XLSX.writeFile(workbook, `data_${timestamp}.xlsx`); // Dynamic filename
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        ...styles.button,
        cursor: jsonData ? "pointer" : "not-allowed",
        opacity: jsonData ? 1 : 0.6,
      }}
      disabled={!jsonData}
    >
      Download as Excel
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 15px",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "10px 5px",
    transition: "background 0.3s",
  },
};

export default Download;
