import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as d3 from "d3";
import { useEffect, useState } from "react";

const MakeScale = ({ xAxis, yAxis, xScale, yScale, scaleWidth, margin }) => {
  return (
    <g>
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
        {yAxis}
      </text>
      <text
        x={scaleWidth / 2}
        y={scaleWidth + margin / 2}
        fontSize="24"
        textAnchor="middle"
      >
        {xAxis}
      </text>

      {xScale.ticks().map((x, i) => {
        return (
          <g
            transform={`translate(${xScale(x)}, 0)`}
            style={{ transition: "all 0.5s ease" }}
            key={i}
          >
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
            style={{ transition: "all 0.5s ease" }}
            key={i}
          >
            <line x1="-10" x2="0" y1={0} y2={0} stroke="black" />
            <text x="-15" y="0" textAnchor="end" dominantBaseline="middle">
              {y}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const MakeChart = ({
  xAxis,
  yAxis,
  data,
  xScale,
  yScale,
  color,
  isDisplay,
}) => {
  const r = 8;
  return (
    <g>
      {data.map((item, i) => {
        color(item.species);
        return (
          isDisplay[item.species] && (
            <circle
              cx="0"
              cy="0"
              r={r}
              fill={color(item.species)}
              transform={`translate(${xScale(item[xAxis])}, ${
                yScale(d3.max(yScale.ticks())) - yScale(item[yAxis])
              })`}
              style={{ transition: "all 0.5s ease" }}
              key={i}
            />
          )
        );
      })}
    </g>
  );
};

const MakeLegend = ({ species, color, legendStart, setIsDisplay }) => {
  const rectWidth = 20;
  return (
    <g transform={`translate(${legendStart}, 0)`}>
      {species.map((item, i) => {
        return (
          <g
            transform={`translate(0, ${40 * i})`}
            key={i}
            onClick={() =>
              setIsDisplay((prev) => ({ ...prev, [item]: !prev[item] }))
            }
            onMouseEnter={(e) => {
              e.target.style.cursor = "pointer";
            }}
          >
            <rect
              x="0"
              y="0"
              width={rectWidth}
              height={rectWidth}
              fill={color(item)}
            />
            <text
              x={rectWidth + 10}
              y={rectWidth / 2}
              dominantBaseline="middle"
              fontSize="24"
            >
              {item}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const HomeWork2 = ({ data }) => {
  const contentsWidth = 1000;
  const contentsHeight = 800;
  const legendWidth = 250;
  const margin = 100;

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const category = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];
  const [xAxis, setXAxis] = useState(category[0]);
  const [yAxis, setYAxis] = useState(category[1]);

  const species = Array.from(
    new Set(data.map(({ species }) => species))
  ).sort();

  const [isDisplay, setIsDisplay] = useState({});

  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => item[xAxis]),
      d3.max(data, (item) => item[xAxis]),
    ])
    .range([0, contentsWidth - legendWidth - margin])
    .nice();

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => item[yAxis]),
      d3.max(data, (item) => item[yAxis]),
    ])
    .range([0, contentsHeight - (margin / 2) * 3])
    .nice();

  useEffect(() => {
    setIsDisplay(
      species.reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
      }, {})
    );
  }, [data]);

  return (
    <div style={{ margin: "50px" }}>
      <Box display="flex" flexDirection="column">
        <FormControl variant="standard" sx={{ m: 1, width: 120 }}>
          <InputLabel id="x-axis-label">x軸</InputLabel>
          <Select
            labelId="x-axis-label"
            id="select-x-axis"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            label="x軸"
          >
            {category.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, width: 120 }}>
          <InputLabel id="y-axis-label">y軸</InputLabel>
          <Select
            labelId="y-axis-label"
            id="select-y-axis"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            label="y軸"
          >
            {category.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <svg width={contentsWidth} height={contentsHeight}>
        <g transform={`translate(${margin}, ${margin / 2})`}>
          <MakeScale
            xScale={xScale}
            yScale={yScale}
            scaleWidth={contentsWidth - legendWidth - margin}
            margin={margin}
            xAxis={xAxis}
            yAxis={yAxis}
          />
          <MakeChart
            data={data}
            xScale={xScale}
            yScale={yScale}
            color={color}
            xAxis={xAxis}
            yAxis={yAxis}
            isDisplay={isDisplay}
          />
          <MakeLegend
            species={species}
            color={color}
            legendStart={contentsWidth - legendWidth - margin}
            setIsDisplay={setIsDisplay}
          />
        </g>
      </svg>
    </div>
  );
};
