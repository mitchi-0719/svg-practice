import { FirstPractice } from "./FirstPractice";
import { HomeWork1 } from "./HomeWork1";
import { HomeWork2 } from "./HomeWork2";

const App = () => {
  const data = {
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

  // return <FirstPractice />;
  // return <HomeWork1 data={data} />;
  return <HomeWork2 />;
};

export default App;
