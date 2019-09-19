import React from "react";
import Typeover from "./typeover/Typeover.js";
import './index.css'

function App() {
  var errors = 0;

  const error = () => {
    errors++;
  };

  const complete = () => {
    alert("Complete with " + errors + " errors.")
  }

  return (
    <div>
      <Typeover
        text={""}
        hint={true}
        onError={error}
        onComplete={complete}
      />
    </div>
  );
}

export default App;
