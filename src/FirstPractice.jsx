export const FirstPractice = () => {
  const left_x = 100;
  const g = [
    {
      label: "A",
      x: 100,
      y: 100,
      width: 250,
      height: 30,
      color: "orange",
    },
    {
      label: "B",
      x: 100,
      y: 200,
      width: 200,
      height: 30,
      color: "purple",
    },
    {
      label: "C",
      x: 100,
      y: 300,
      width: 100,
      height: 30,
      color: "pink",
    },
  ];

  return (
    <svg width="400" height="400">
      <line x1={left_x} x2={left_x} y1="0" y2="400" stroke="black" />
      {g.map((item, i) => {
        return (
          <g key={i}>
            <rect
              x={item.x}
              y={item.y - item.height / 2}
              width={item.width}
              height={item.height}
              fill={item.color}
            />
            <line
              x1={left_x - 10}
              x2={left_x}
              y1={item.y}
              y2={item.y}
              stroke="black"
            />
            <text
              x={left_x - 10}
              y={item.y + item.height / 4}
              fontSize="20"
              textAnchor="end"
              fill="black"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
