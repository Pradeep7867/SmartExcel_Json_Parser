import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Download = () => {
  const [jsonData, setJsonData] = useState(null);

  const fetchJsonData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/json-to-excel`);
      setJsonData(response.data);
      alert("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      alert("Failed to fetch data!");
    }
  };

  const handleDownload = () => {
    if (!jsonData || jsonData.length === 0) {
      alert("No data to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  return (
    <div>
      <button onClick={fetchJsonData} style={styles.button}>
        Fetch JSON Data
      </button>
      <button onClick={handleDownload} style={styles.button} disabled={!jsonData}>
        Download as Excel
      </button>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 15px",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 5px",
  },
};

export default Download;
