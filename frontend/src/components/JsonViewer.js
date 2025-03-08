import React from "react";

const JsonViewer = ({ jsonData }) => {
  if (!jsonData) return null; // Don't show anything if there's no data

  return (
    <div style={styles.container}>
      <h3>Converted JSON Data:</h3>
      <pre style={styles.pre}>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    borderRadius: "5px",
  },
  pre: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "left",
  },
};

export default JsonViewer;
