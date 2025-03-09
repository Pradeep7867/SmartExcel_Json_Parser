import React from "react";

const JsonViewer = ({ jsonData }) => {
  if (!jsonData) return <p style={styles.noData}>No JSON Data Available</p>;

  return (
    <pre style={styles.jsonContainer}>
      {JSON.stringify(jsonData, null, 2)}
    </pre>
  );
};

const styles = {
  jsonContainer: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "14px",
    border: "1px solid #ddd", // ✅ Added a border
    maxHeight: "300px", // ✅ Limit height to prevent large JSON from breaking UI
    overflowY: "auto", // ✅ Enable scrolling for large JSON
  },
  noData: {
    color: "#888",
    textAlign: "center",
    fontSize: "16px",
  },
};

export default JsonViewer;
