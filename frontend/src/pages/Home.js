import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import JsonViewer from "../components/JsonViewer";
import Download from "../components/Download";
const Home = () => {
  const [jsonData, setJsonData] = useState(null);

  return (
    <div style={styles.container}>
      <h1>SmartExcel JSON Parser</h1>
      <FileUpload setJsonData={setJsonData} />
      {jsonData && <JsonViewer jsonData={jsonData} />}
      {jsonData && <Download jsonData={jsonData} />}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
};


export default Home;
