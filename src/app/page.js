"use client";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState(null); // store uploaded file
  const [text, setText] = useState("");     // store extracted text
  const [loading, setLoading] = useState(false); // show loading state

  // When a user selects a file
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setText(""); // reset text if a new file is selected
  };

  // When user clicks Extract Data
  const handleOCR = () => {
    if (!image) return alert("Please select an image first.");

    setLoading(true); // show "Extracting text..."
    Tesseract.recognize(
      image,
      "eng",
      { logger: (m) => console.log(m) } // shows OCR progress in console
    ).then(({ data: { text } }) => {
      setText(text);   // store extracted text
      setLoading(false); // hide loading
    });
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
        </div>
      )}
    </div>
  );
}
