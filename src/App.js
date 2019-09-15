import React from "react";
import Typeover from "./typeover/Typeover";

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
        text={"The quick brown fox jumped over the  lazy dog."}
        mode="recall"
        onError={error}
        onComplete={complete}
      />
    </div>
  );
}

export default App;
