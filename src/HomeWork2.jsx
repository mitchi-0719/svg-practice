import * as d3 from "d3";

const MakeScale = ({ xScale, yScale, scaleWidth, margin }) => {
  return (
    <>
      <line
        x1="0"
        x2={scaleWidth}
        y1={scaleWidth}
        y2={scaleWidth}
        stroke="black"
      />
      <line x1="0" x2="0" y1="0" y2={scaleWidth} stroke="black" />

      <text
        x={-(margin / 2)}
        y={scaleWidth / 2}
        transform={`rotate(-90 ${-margin / 2} ${scaleWidth / 2})`}
        textAnchor="middle"
        fontSize="24"
      >
        Sepal Width
      </text>
      <text
        x={scaleWidth / 2}
        y={scaleWidth + margin / 2}
        fontSize="24"
        textAnchor="middle"
      >
        Sepal Length
      </text>

      {xScale.ticks().map((x, i) => {
        return (
          <g transform={`translate(${xScale(x)}, 0)`} key={i}>
            <line
              x1="0"
              x2="0"
              y1={scaleWidth}
              y2={scaleWidth + 10}
              stroke="black"
            />
            <text
              x="0"
              y={scaleWidth + 10}
              textAnchor="middle"
              dominantBaseline="text-before-edge"
            >
              {x}
            </text>
          </g>
        );
      })}
      {yScale.ticks().map((y, i) => {
        return (
          <g
            transform={`translate(0, ${
              yScale(d3.max(yScale.ticks())) - yScale(y)
            })`}
            key={i}
          >
            <line x1="-10" x2="0" y1={0} y2={0} stroke="black" />
            <text x="-15" y="0" textAnchor="end" dominantBaseline="middle">
              {y}
            </text>
          </g>
        );
      })}
    </>
  );
};

const MakeChart = () => {};

const MakeLegend = () => {};

export const HomeWork2 = ({ data }) => {
  const contentsWidth = 1000;
  const contentsHeight = 800;
  const legendWidth = 250;
  const margin = 100;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => item.sepalLength),
      d3.max(data, (item) => item.sepalLength),
    ])
    .range([0, contentsWidth - legendWidth - margin])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => item.sepalWidth),
      d3.max(data, (item) => item.sepalWidth),
    ])
    .range([0, contentsHeight - (margin / 2) * 3])
    .nice();

  return (
    <div style={{ margin: "50px" }}>
      <svg width={contentsWidth} height={contentsHeight}>
        <g transform={`translate(${margin}, ${margin / 2})`}>
          <MakeScale
            xScale={xScale}
            yScale={yScale}
            scaleWidth={contentsWidth - legendWidth - margin}
            margin={margin}
          />
        </g>
      </svg>
    </div>
  );
};
