import React, { useState, useRef ,useEffect } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Required for fonts
import { saveAs } from "file-saver"; // Required for downloading the PDF

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [downloadFileName, setDownloadFileName] = useState(""); // State to manage the download file name
  const textAreaRef = useRef(null);
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');



  useEffect(() => {
    // When the component mounts, set the text from props into state
    setText(props.text);
  }, [props.text]);
  
  
  const handlePDFDownload = () => {
    if (downloadFileName === "") {
      props.showAlert("Please enter a file name.", "warning");
    } else if (props.text === "") {
      props.showAlert("Please enter some text to generate a PDF.", "warning");
    } else {
      const pdfContent = {
        content: [{ text: props.text }],
        pageSize: "A4",
        styles: {
          defaultStyle: {
            fontSize: 12,
          },
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(pdfContent);

      pdfDocGenerator.getBlob((pdfBlob) => {
        // Save the PDF Blob using FileSaver.js
        saveAs(pdfBlob, downloadFileName + ".pdf");

        props.showAlert("PDF generated and downloaded successfully!", "success");
      });
    }
  };


  
//props.onTextChange

  // Function to handle file download
  const handleFileDownload = () => {
    if (downloadFileName === "") {
      // If downloadFileName is empty, show an alert
      props.showAlert("Please enter a file name.", "warning");
    } else {
      // Create a new Blob with the text content
      const blob = new Blob([props.text], { type: "text/plain" });

      // Create a temporary anchor element
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = downloadFileName;

      // Programmatically trigger the anchor element to initiate download
      document.body.appendChild(a);
      a.click();

      // Remove the temporary anchor element
      document.body.removeChild(a);

      // Show a success alert
      props.showAlert("File downloaded successfully!", "success");
    }
  };
  const handleUpClick = () => {
    let newText = props.text.toUpperCase();
    props.onTextChange(newText); // Update text using the handler
    props.showAlert('Converted to uppercase!', 'success');
    textAreaRef.current.focus();
  };

  const handleDotClick = () => {
    let newText = props.text.split('.').map((sentence) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length === 0) return ''; // Ignore empty sentences 
      const firstLetter = trimmedSentence[0].toUpperCase(); 
      const restOfSentence = trimmedSentence.slice(1);
      return firstLetter + restOfSentence;
    }).join('. '); 
    props.onTextChange(newText);
    props.showAlert('Converted to uppercase!', 'success');
    textAreaRef.current.focus();
  };

  const handleLoClick = () => {
    let newText = props.text.toLowerCase();
    props.onTextChange(newText);
    props.showAlert('Converted to lowercase!', 'success');
    textAreaRef.current.focus();
  };

  const handleClearClick = () => {
    let newText = '';
    props.onTextChange(newText);
    props.showAlert('Text Cleared!', 'success');
    textAreaRef.current.focus();
  };

 

  const handleInsertBulletPoint = () => {
    if (textAreaRef.current && props.text.length === 0) {
      const startPos = textAreaRef.current.selectionStart;
      const endPos = textAreaRef.current.selectionEnd;
      const bulletPoint = "• ";
      const bulletText = props.text.slice(startPos, endPos).trim(); // Get the selected text

      const updatedText =
        props.text.slice(0, startPos) +
        bulletPoint +
        bulletText +
        props.text.slice(endPos);

        props.onTextChange(updatedText);
        textAreaRef.current.focus();
    }
    if(textAreaRef.current && props.text.length !== 0){
      props.onTextChange((prevText) => prevText + "\n• ");
      textAreaRef.current.focus();
    }
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(props.text);
    props.showAlert('Copied to Clipboard!', 'success');
  };

  const handleExtraSpaces = () => {
    let newText = props.text.split(/[ ]+/);
    props.onTextChange(newText.join(' '));
    props.showAlert('Extra spaces removed!', 'success');
    textAreaRef.current.focus();
  };

  const handleTextAreaChange = (e) => {
    props.onTextChange(e.target.value);
  };

  const handleFindReplace = () => {
    if (!findWord) {
      props.showAlert('Please enter a word to find!', 'danger');
      return;
    }

    let newText = props.text.split(findWord).join(replaceWord);
    props.onTextChange(newText);
    props.showAlert('Text replaced successfully!', 'success');
 let newFindword ='';
 setFindWord(newFindword)
 setReplaceWord(newFindword)
  };
 

  const handleToggleCalk = () => {
    props.toggleCalkVisibility();
  };
 // style={{ backgroundColor: props.mode === 'dark' ? '#393e42' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}
  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1 className="mb-4">{props.heading}</h1>
           <div className="mb-3">
           <textarea
            ref={textAreaRef}
            value={props.text}
            className="form-control"
            style={{
              backgroundColor: props.mode === 'dark' ? '#393e42' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743',
            }}
            onChange={handleTextAreaChange}
            rows="8"
          ></textarea>         

           </div>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}> All CAPITAL</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>All smaller</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy All</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        <button disabled={props.text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleDotClick}>Capital after dot</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleInsertBulletPoint}>
            Insert Bullet Point
          </button>
          
          <div className="input-group mb-3">
          <input
            type="text"
            className="form-control mx-1 my-1"
            placeholder="Word to find"
            value={findWord}
            onChange={(e) => setFindWord(e.target.value)}
          />
          <input
            type="text"
            className="form-control mx-1 my-1"
            placeholder="Replace with"
            value={replaceWord}
            onChange={(e) => setReplaceWord(e.target.value)}
          />
          <button disabled={findWord.length===0} className="fnr btn btn-primary mx-1 my-1" onClick={handleFindReplace}>
            Find and Replace
          </button>
        </div>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text summary</h2>
        <b>
        <p>
          {props.text.split(/\s+/).filter((element) => {return element.length !== 0;}).length}{' '}Words and {props.text.length} Characters</p>
        {/* <p>{0.008 * props.text.split(/\s+/).filter((element) => element.length !== 0).length} Minutes read</p> */}
        {/* <p>{props.text.split(/[.?•]/).filter((line) => line.trim() !== "").length} Lines , includes</p> */}
        <p>{props.text.split(/(?<=[.?!•])\s+/).filter((line) => line.trim() !== "").length} Lines</p>
        <p>{props.text.split('•').length - 1} Bullet Points and {props.text.split('?').length - 1} Question Marks</p>
       </b>

       {/* calculator trigger */}
        {props.mode === "light" || props.mode === "dark" ? (
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleToggleCalk}
        >
        Calculator
        </button>
      ) : null}

        <h2>Preview</h2>
        <p className="prev">{props.text.length > 0 ? text : 'Nothing to preview!'}</p>

        <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter file name for download"
          value={downloadFileName}
          onChange={(e) => setDownloadFileName(e.target.value)}
          style={{ backgroundColor: props.mode === "dark" ? "#393e42" : "white", color: props.mode === "dark" ? "white" : "#042743" }}
        />
      </div>
      <button
        disabled={props.text.length === 0 || downloadFileName.trim() === ""}
        className="btn btn-primary mx-1 my-1"
        onClick={handleFileDownload}
      >
        Download Text File
      </button>
      <button
        disabled={props.text.length === 0 || downloadFileName.trim() === ""}
        className="btn btn-primary mx-1 my-1"
        onClick={handlePDFDownload}
      >
        Download PDF
      </button>
      </div>
    </>
  );
}
