// src/components/JsonToExcel.js
import React, { useState } from "react";
import axios from "axios";
import JsonViewer from "./JsonViewer"; // ✅ Importing the viewer component

const JsonToExcel = () => {
  const [jsonInput, setJsonInput] = useState(""); // Stores user input
  const [jsonData, setJsonData] = useState(null); // Stores parsed JSON

  // ✅ Convert JSON to Excel & download the file
  const handleConvert = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput); // Convert input text to JSON
      setJsonData(parsedJson); // Store JSON for display

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/json-to-excel`, // Backend API
        parsedJson,
        { responseType: "blob" } // Expect a file response
      );

      if (response.status === 200) {
        // ✅ Create a download link for Excel file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "output.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert("Conversion failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid JSON input!");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Paste JSON Data:</h3>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here..."
        rows={8}
        cols={50}
        style={styles.textarea}
      />
      <button onClick={handleConvert} style={styles.button}>
        Convert to Excel
      </button>

      {/* ✅ Show formatted JSON using the JsonViewer component */}
      <JsonViewer jsonData={jsonData} />
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
  textarea: {
    width: "80%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default JsonToExcel;
