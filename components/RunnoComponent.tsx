/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "@runno/runtime";

const RunnoComponent = () => {
  // ignore all typescript errors
  // @ts-ignore
  return (
    <runno-run runtime="python" editor controls>
      print("Hello, World!")
    </runno-run>
  );
};

export default RunnoComponent;
