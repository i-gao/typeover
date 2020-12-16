import React from "react";
import Typeover from "typeover";

function ExampleApp() {
  var errors = 0;

  const error = () => {
    errors++;
  };

  const complete = () => {
    alert("Complete with " + errors + " errors.")
  }

  return (
    <>
      <Typeover
        text={"The quick brown fox jumped over the lazy dog."}
        holdOnError={false}
        onError={error}
        onComplete={complete}
      />
      <Typeover
        text={"The quick brown fox jumped over the lazy dog."}
        holdOnError={true}
        onError={error}
        onComplete={complete}
      />
    </>
  );
}

export default ExampleApp;
