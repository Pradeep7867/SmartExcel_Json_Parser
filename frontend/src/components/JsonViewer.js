import React from "react";

const JsonViewer = ({ jsonData }) => {
  if (!jsonData) return <p style={styles.noData}>No JSON Data Available</p>;


  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    alert("JSON copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <pre style={styles.jsonContainer}>
        {JSON.stringify(jsonData, null, 2)}
      </pre>
      <button onClick={handleCopy} style={styles.button}>
        Copy JSON
      </button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", margin: "10px" },
  jsonContainer: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "14px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


export default JsonViewer;
