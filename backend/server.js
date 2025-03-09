const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("Excel-JSON Parser API is running...");
});

// Export Express as a Vercel Serverless Function
module.exports = app;

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
