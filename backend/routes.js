const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, 
  //  Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error(" Only .xlsx files are allowed!"));
    }
    cb(null, true);
  },
});

/**
 * 📌 API 1: Convert Excel to JSON
 */
router.post("/excel-to-json", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.readFile(req.file.path);
    let jsonData = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      jsonData[sheetName] = xlsx.utils.sheet_to_json(sheet);
    });

    // ✅ Delete the file after processing to save space
    fs.unlinkSync(req.file.path);

    return res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error processing Excel file:", error);
    return res.status(500).json({ error: "Error processing Excel file" });
  }
});

/**
 * 📌 API 2: Convert JSON to Excel
 */
router.post("/json-to-excel", (req, res) => {
  try {
    const jsonData = req.body;
    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: "No JSON data provided" });
    }

    const workbook = xlsx.utils.book_new();

    // ✅ Loop through JSON keys to create multiple sheets
    Object.keys(jsonData).forEach((sheetName) => {
      const worksheet = xlsx.utils.json_to_sheet(jsonData[sheetName]);
      xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    const filePath = `uploads/output_${Date.now()}.xlsx`;
    xlsx.writeFile(workbook, filePath);

    // ✅ Set headers for proper download response
    res.setHeader("Content-Disposition", `attachment; filename="output.xlsx"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    return res.download(filePath, () => {
      fs.unlinkSync(filePath); // Delete file after sending
    });

  } catch (error) {
    return res.status(500).json({ error: "Error processing JSON to Excel" });
  }
});
module.exports = router;

