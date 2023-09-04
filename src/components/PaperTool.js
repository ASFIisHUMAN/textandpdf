// npm install react-quill

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles


export default function TextForm(props) {
  const [text, setText] = useState("");
  const [currentFontSize, setCurrentFontSize] = useState("16px"); // Default font size

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  };
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
];

  const formats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
    'align',
  ];

  const handleFontSizeChange = (fontSize) => {
    setCurrentFontSize(fontSize);
  };

  return (
    <div className="container">
      <h1>{props.heading}</h1>
      <ReactQuill
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
        style={{ fontSize: currentFontSize }}
        rows="8"
      />
      <select
        value={currentFontSize}
        onChange={(e) => handleFontSizeChange(e.target.value)}
      >
        <option value="12px">12</option>
        <option value="16px">16</option>
        <option value="20px">20</option>
      </select>
    
      </div>
      );
    }   
