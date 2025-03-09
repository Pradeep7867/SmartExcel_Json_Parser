import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import JsonViewer from "../components/JsonViewer";
//import Download from "../components/Download";
import JsonToExcel from "../components/JsonToExcel";

const Home = () => {
  const [jsonData, setJsonData] = useState(null);
  const [activeTab, setActiveTab] = useState("excelToJson"); // Default: Excel to JSON

  return (
    <div style={styles.container}>
      <h1>SmartExcel JSON Parser</h1>

      {/* Tab Selection */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab("excelToJson")}
          style={activeTab === "excelToJson" ? styles.activeTab : styles.tab}
        >
          Excel → JSON
        </button>
        <button
          onClick={() => setActiveTab("jsonToExcel")}
          style={activeTab === "jsonToExcel" ? styles.activeTab : styles.tab}
        >
          JSON → Excel
        </button>
      </div>

      {/* Excel → JSON Section */}
      {activeTab === "excelToJson" && (
        <div style={styles.section}>
          <h3>Upload an Excel file to convert it into JSON</h3>
          <FileUpload setJsonData={setJsonData} />
          {jsonData && <JsonViewer jsonData={jsonData} />}
        </div>
      )}

      {/* JSON → Excel Section */}
      {activeTab === "jsonToExcel" && (
        <div style={styles.section}>
          <h3>Convert JSON to Excel</h3>
          <JsonToExcel />
        </div>
      )}
    </div>
  );
};
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "5px",
  },
  activeTab: {
    padding: "10px 20px",
    margin: "0 5px",
    cursor: "pointer",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  section: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "20px auto",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
  },
};


export default Home;
