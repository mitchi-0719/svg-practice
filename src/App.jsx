import { useState, useEffect } from "react";
import { FirstPractice } from "./FirstPractice";
import { HomeWork1 } from "./HomeWork1";
import { HomeWork2 } from "./HomeWork2";

const App = () => {
  const [h2Data, setH2Data] = useState([]);
  const h1Data = {
    labels: ["A", "B", "C", "D"],
    series: [
      {
        name: "data",
        values: [123, 456, 789, 1111],
      },
      {
        name: "another data",
        values: [234, 567, 891, 1024],
      },
      {
        name: "and more",
        values: [567, 678, 789, 890],
      },
    ],
  };

  useEffect(() => {
    (async () => {
      const url =
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json";
      const getData = await fetch(url)
        .then((res) => res.json())
        .then((data) => setH2Data(data));
    })();
  }, []);

  // return <FirstPractice />;
  // return <HomeWork1 data={h1Data} />;
  return <HomeWork2 data={h2Data} />;
};

export default App;
