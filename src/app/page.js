"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setText("");
  };

  const handleOCR = () => {
    if (!image) return alert("Please select an image first.");

    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  // 🔽 NEW: Export CSV function
  const handleExportCSV = () => {
    if (!text) return alert("No data to export!");

    const rows = text
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => `"${line.replace(/"/g, '""')}"`);

    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "output.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>SnapToSheet</h1>
      <p>Upload invoice screenshot → Get Excel-ready text</p>

      <input type="file" onChange={handleImageChange} />
      <button onClick={handleOCR} style={{ marginLeft: 10 }}>
        Extract Data
      </button>

      {loading && <p>Extracting text... ⏳</p>}

      {text && (
        <div style={{ marginTop: 20 }}>
          <h2>Extracted Text:</h2>
          <pre>{text}</pre>

          {/* 🔽 NEW Export Button */}
          <button
            onClick={handleExportCSV}
            style={{ marginTop: 10, padding: "8px 16px" }}
          >
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
}
