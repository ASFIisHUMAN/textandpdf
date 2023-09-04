import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calk from './components/Calk';

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const [calkVisible, setCalkVisible] = useState(false);
  const [text, setText] = useState(""); // State to hold the text

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1b1b1b"; // Body dark mode color
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white"; // Body light mode color
      showAlert("Light mode has been enabled", "success");
    }
  };

  const handleToggleCalk = () => {
    setCalkVisible((prevState) => !prevState);
  };

  const handleToggleTextForm = () => {
    setCalkVisible((prevState) => !prevState);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <>
      <Router>
        <Navbar
          title="Text"
          mode={mode}
          toggleMode={toggleMode}
        />
        <Alert alert={alert} />
        <div className="">
        <Switch>
          <Route exact path="/about">
            <About mode={mode} />
          </Route>
          <Route exact path="/">
            {calkVisible ? (
              <Calk mode={mode} toggleTextFormVisibility={handleToggleTextForm} />
            ) : (
              <TextForm
                text={text} // Pass the text state
                onTextChange={handleTextChange} // Pass the handler to update text
                showAlert={showAlert}
                heading="Try  - edit any string "
                mode={mode}
                toggleCalkVisibility={handleToggleCalk}
              />
            )}
          </Route>
        </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
