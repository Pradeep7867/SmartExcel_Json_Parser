import React, { useState } from "react";
import axios from "axios";
import Download from "./Download"; // Import Download Component

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/excel-to-json`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setJsonData(response.data); // ✅ Store JSON Data
        setMessage("Upload Successful!");
      } else {
        setMessage("Upload Failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Upload Failed!");
    }
  };
// ✅ Define handleCopyJson function here
const handleCopyJson = () => {
  if (jsonData) {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    alert("JSON copied to clipboard!");
  } else {
    alert("No JSON data to copy!");
  }
};
  return (
    <div style={styles.container}>
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleUpload} style={styles.button}>Upload</button>
      {message && <p>{message}</p>}

      {jsonData && (
        <>
          <h3>Processed JSON Output:</h3>
          <pre style={styles.pre}>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={handleCopyJson} style={styles.button}>Copy JSON</button>
          <Download jsonData={jsonData} />
        </>
      )}
    </div>
  );
};

// ✅ Added Some Basic Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
  },
  input: {
    marginBottom: "10px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#6A38C2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  pre: {
    textAlign: "left",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    overflowX: "auto",
  },
  copyButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
    marginBottom: "10px",
  }
};

export default FileUpload;
