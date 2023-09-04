import React, { useState } from 'react';
import { evaluate /* , sqrt , pow */} from 'mathjs';
export default function Calk(props) {
  const [displayValue, setDisplayValue] = useState('');
  const [/* usingPreviousAnswer */, setUsingPreviousAnswer] = useState(false);
  const [previousAnswer, setPreviousAnswer] = useState('');

  // const [isDark, setIsDark] = useState(true);

  const handleBackspace = () => {
    setDisplayValue((prevValue) => prevValue.slice(0, -1));
  };

 

  const handleButtonClick = (buttonId) => {
    if (buttonId === 'clear') {
      setDisplayValue('');
    } else if (buttonId === 'backspace') {
      handleBackspace();
    } else if (buttonId === 'power') {
      setDisplayValue((prevValue) => prevValue + '^');
    } else if (buttonId === 'copy') {
      const display = document.getElementById('display');
      const tempInput = document.createElement('input');
      tempInput.value = display.innerText;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }else if (buttonId === 'equal') {
      try {
        const result = parseAndEvaluate(displayValue);
        const formattedResult = formatResult(Number(result));
        const fullExpression = `${displayValue}=${formattedResult}`;
        const linesObject = calculateDisplayLines(fullExpression);
        
        if (linesObject && linesObject.lines) {
          setDisplayValue(linesObject.lines.join('\n'));
        }
        
        setPreviousAnswer(formattedResult); // Store the previous answer
      } catch (error) {
        setDisplayValue('Error');
        console.log(error)
      }
    } else if (buttonId === 'use-previous') {
      if (previousAnswer !== null) {
        setDisplayValue((prevValue) => prevValue + previousAnswer);
      }
    } else {
      const displaySymbol = buttonId === '*' ? '×' : buttonId === '/' ? '÷' : buttonId;
      setDisplayValue((prevValue) => prevValue + displaySymbol);
    }
  };
  
  const handleUsePreviousAnswer = () => {
    if (previousAnswer) {
      setDisplayValue(previousAnswer);
      setUsingPreviousAnswer(true);
    }
  };

  const calculateDisplayLines = (value) => {
    const maxCharsPerLine = 14; // Maximum characters per line
    const cleanedValue = value.replace(/\s+/g, ''); // Remove all spaces
    const lines = [];
  
    for (let i = 0; i < cleanedValue.length; i += maxCharsPerLine) {
      lines.push(cleanedValue.slice(i, i + maxCharsPerLine));
    }
  
    return { lines, totalLines: lines.length };
  };
  
  
  
  
  const formatResult = (result) => {
    const formatted = Number(result).toFixed(2);
    return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
  };
  
  
  const parseAndEvaluate = (value) => {
    let result = value;
  
    if (result.includes('^')) {
      const parts = result.split('^');
      if (parts.length === 2) {
        const base = parts[0];
        const exponent = parts[1];
        result = Math.pow(Number(base), Number(exponent));
      }
    } else if (result.includes('√')) {
      const valueToRoot = result.replace('√', '');
      result = Math.sqrt(Number(valueToRoot));
    } else {
      result = evaluate(result.replace('×', '*').replace('÷', '/'));
    }
  
    return Number(result.toFixed(2)).toString();
  };
  
  
  

  // const handleThemeToggle = () => { setIsDark((prevIsDark) => !prevIsDark); };

  const handleToggleTextForm = () => {
    props.toggleTextFormVisibility();
  };
  return (
   
      <div className="conteiner">
        <div className={`cadk ${ props.mode === 'dark' ? 'dark' : '' }`}>
          {/* <div className={`theme-toggler  ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={handleThemeToggle}><i className="toggler-icon"></i></div> */}
           <div className="desplay-s">
           <div
  id="display"
  className={`display-content ${
    props.mode === 'dark' ? 'dark' : ''
  } ${calculateDisplayLines(displayValue).totalLines > 2 ? 'scrollable-container' : ''}`}
>
  {calculateDisplayLines(displayValue).lines.map((line, index) => (
    <div key={index}>{line}</div>
  ))}
</div>
          </div>
          <div className={`buttons ${ props.mode === 'dark' ? 'dark' : '' }`}>
            <table>
              <tbody>
                <tr>
                  <td> <button className={`btna btn-equal ${props.mode === 'dark' ? 'dark' : ''}`}onClick={handleUsePreviousAnswer}id="use-previous-answer"><b>Ans</b></button></td>
                </tr>
               <tr>
                  <td><button className={`btna btn-opa ${props.mode === 'dark' ? 'dark' : ''}`} onClick={() => handleButtonClick('²')}>x²</button></td>
                  <td><button className={`btna btn-opa ${props.mode === 'dark' ? 'dark' : ''}`} onClick={() => handleButtonClick('√')}>√</button></td>
                  <td><button className={`btna btn-opa ${props.mode === 'dark' ? 'dark' : ''}`} onClick={() => handleButtonClick('power')}>xⁿ</button></td>
                  <td><button className={`btna btn-opa ${props.mode === 'dark' ? 'dark' : ''}`} onClick={() => handleButtonClick('copy')}>Copy</button></td>
               </tr>
                <tr>
                  <td><button className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('clear')} id="clear"><h2>c</h2></button></td>
                  <td><button className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('/')} id="/"><h2>÷</h2></button></td>
                  <td><button className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('*')} id="*"><h2>×</h2></button></td>
                  <td><button className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('backspace')} id="backspace"><h2>{'<'}</h2></button></td>
                </tr>
                <tr>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('7')} id="7">7</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('8')} id="8">8</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('9')} id="9">9</button></td>
                  <td><button  className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('-')} id="-"><h1>-</h1></button></td>
                </tr>
                <tr>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('4')} id="4">4</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('5')} id="5">5</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('6')} id="6">6</button></td>
                  <td><button  className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('+')} id="+"><h2>+</h2></button></td>
                </tr>
                <tr>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('1')} id="1">1</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('2')} id="2">2</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('3')} id="3">3</button></td>
                  <td><button className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('.')} id="."><h2><b>.</b></h2></button></td>
                </tr>
                <tr>
                  <td><button  className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('(')} id="(">(</button></td>
                  <td><button className={`btna btn-num ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={() => handleButtonClick('0')} id="0">0</button></td>
                  <td><button  className={`btna btn-opa ${ props.mode === 'dark' ? 'dark' : '' }`} onClick={ () => handleButtonClick(')')} id=")">)</button></td>
                  <td colSpan="2"><button className="btna btn-equal" onClick={() => handleButtonClick('equal')} id="equal"><h2>=</h2></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> {props.mode === "dark" || props.mode === "light" ? (
        <button
          className={` close btn btn-primary mx-1 my-1 ${ props.mode === 'dark' ? 'dark' : '' }`}
          onClick={handleToggleTextForm}
        >
          Show TextForm
        </button>
      ) : null}
      </div>
  
  );
};
