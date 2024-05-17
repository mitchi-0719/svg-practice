import * as d3 from "d3";

export const HomeWork1 = ({ data }) => {
  const rectH = 20;
  const margin = 10;
  const contentWidth = 1000;
  const leftMargin = 50;
  const legendWidth = 300;
  const gHeight =
    data.series.length * rectH + (data.series.length + 1) * margin;
  const contentHeight = gHeight * data.labels.length + margin * 2;

  const flatValues = data.series.flatMap(({ values }) => values);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(flatValues, (item) => item)])
    .range([0, contentWidth - (leftMargin + legendWidth)])
    .nice();
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  return (
    <div style={{ marginTop: "40px", marginLeft: "40px" }}>
      <svg width={contentWidth} height={contentHeight}>
        <MakeScale
          xScale={xScale}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          leftMargin={leftMargin}
          legendWidth={legendWidth}
        />

        <MakeChart
          data={data}
          gHeight={gHeight}
          rectH={rectH}
          margin={margin}
          xScale={xScale}
          color={color}
        />

        <MakeLegend
          data={data}
          color={color}
          contentWidth={contentWidth}
          legendWidth={legendWidth}
        />
      </svg>
    </div>
  );
};

const MakeScale = ({
  xScale,
  contentWidth,
  contentHeight,
  leftMargin,
  legendWidth,
}) => {
  return (
    <>
      {xScale.ticks().map((x, i) => {
        return (
          <g transform={`translate(${xScale(x) + leftMargin}, 0)`} key={i}>
            <line x1="0" x2="0" y1="0" y2={contentHeight - 15} stroke="black" />
            <text y={contentHeight} textAnchor="middle">
              {x}
            </text>
          </g>
        );
      })}
      <line
        x1={leftMargin}
        x2={contentWidth - legendWidth}
        y1={contentHeight - 20}
        y2={contentHeight - 20}
        stroke="black"
      />
    </>
  );
};

const MakeChart = ({ data, gHeight, rectH, margin, xScale, color }) => {
  return (
    <>
      {data.labels.map((label, i) => {
        return (
          <g transform={`translate(0, ${gHeight * i})`} key={i}>
            <text
              x={30}
              y={gHeight / 2}
              textAnchor="end"
              dominantBaseline="middle"
            >
              {label}
            </text>
            <line
              x1={35}
              x2={50}
              y1={gHeight / 2}
              y2={gHeight / 2}
              stroke="black"
            />
            {data.series.map(({ name, values }, j) => {
              return (
                <rect
                  x={50}
                  y={margin}
                  width={xScale(values[i])}
                  height={rectH}
                  fill={color(name)}
                  key={j}
                  transform={`translate(0, ${margin * j + rectH * j})`}
                />
              );
            })}
          </g>
        );
      })}
    </>
  );
};

const MakeLegend = ({ data, color, contentWidth, legendWidth }) => {
  const boxWidth = 20;
  const legendStart = contentWidth - legendWidth + 10;
  return (
    <>
      {data.series.map(({ name }, i) => {
        return (
          <g transform={`translate(0, ${30 * i})`} key={i}>
            <rect
              x={legendStart}
              y={10}
              width={boxWidth}
              height={boxWidth}
              fill={color(name)}
            />
            <text
              x={legendStart + boxWidth + 10}
              y={10 + boxWidth / 2}
              textAnchor="start"
              dominantBaseline="middle"
            >
              {name}
            </text>
          </g>
        );
      })}
    </>
  );
};
