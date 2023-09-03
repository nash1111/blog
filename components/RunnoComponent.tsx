/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "@runno/runtime";

const RunnoComponent = () => {
  // ignore all typescript errors
  // @ts-ignore
  const runPythonScript = `
  print("Hi")
  number = int(input("Choose number"))
  if number % 2 == 0:
      print("That number is even")
  print("Done")
  `;
  return (
    <runno-run runtime="python" editor controls>
      {runPythonScript}
    </runno-run>
  );
};

export default RunnoComponent;
