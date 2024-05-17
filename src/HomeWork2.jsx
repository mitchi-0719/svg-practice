import { useEffect, useState } from "react";
import * as d3 from "d3";

const MakeScale = ({ xScale, yScale, scaleWidth, margin }) => {
  return (
    <>
      <line
        x1={margin}
        x2={scaleWidth}
        y1={scaleWidth - margin}
        y2={scaleWidth - margin}
        stroke="black"
      />
      <line
        x1={margin}
        x2={margin}
        y1="0"
        y2={scaleWidth - margin}
        stroke="black"
      />

      {xScale.ticks().map((x, i) => {
        return (
          <g transform={`translate(${xScale(x)}, 0)`} key={i}>
            <line x1="0" x2="0" y1="0" y2={contentHeight - 15} stroke="black" />
            <text
              x={margin}
              y={contentHeight}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {x}
            </text>
          </g>
        );
      })}
    </>
  );
};

const MakeChart = () => {};

const MakeLegend = () => {};

export const HomeWork2 = () => {
  const contentsWidth = 1000;
  const contentsHeight = 800;
  const legendWidth = 200;
  const margin = 50;

  const [data, setData] = useState([]);
  const [xScale, setXScale] = useState([]);
  const [yScale, setYScale] = useState([]);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    console.log("aa")(async () => {
      await fetch(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json"
      )
        .then((response) => response.json())
        .then((_data) => setData(_data));
    })();
  }, []);

  useEffect(() => {
    const _xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (item) => item.sepalLength),
        d3.max(data, (item) => item.sepalLength),
      ])
      .range([margin, contentsWidth - legendWidth])
      .nice();

    const _yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (item) => item.sepalWidth),
        d3.max(data, (item) => item.sepalWidth),
      ])
      .range([margin, contentsHeight])
      .nice();

    setXScale(_xScale);
    setYScale(_yScale);
  }, [data]);

  return (
    <div style={{ marginLeft: "50px", marginTop: "50px" }}>
      <svg width={contentsWidth} height={contentsHeight}>
        <MakeScale
          xScale={xScale}
          yScale={yScale}
          scaleWidth={contentsWidth - legendWidth}
          margin={margin}
        />
      </svg>
    </div>
  );
};
