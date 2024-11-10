import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchAPI } from "./api.jsx";

const Axis = ({ scale, orient, transform, id }) => {
  const axisRef = useRef();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].reverse();

  useEffect(() => {
    const axisGenerator =
      orient === "bottom"
        ? d3.axisBottom(scale).ticks(d3.timeYear.every(10))
        : d3.axisLeft(scale).tickFormat((d) => months[d - 1]);
    d3.select(axisRef.current).call(axisGenerator);
  }, [scale, orient]);

  return <g id={id} ref={axisRef} transform={transform} />;
};

export const BarAxis = ({ heightSVG, widthSVG, children }) => {
  const width = widthSVG;
  const height = heightSVG;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI((data) => setData(data.monthlyVariance));
  }, []);

  const xAxisMin = d3.min(data, (d) => d.year);
  const xAxisMax = d3.max(data, (d) => d.year);

  // Skala sumbu
  const xScale = d3
    .scaleTime()
    .domain([new Date(xAxisMin, 0, 1), new Date(xAxisMax, 11, 31)])
    .range([0, width - margin.left - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([0.5, 12.5])
    .range([height - margin.top - margin.bottom, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Sumbu X di bawah */}
        <Axis
          id={"x-axis"}
          scale={xScale}
          orient="bottom"
          transform={`translate(0,${height - margin.top - margin.bottom})`}
        />
        {children}
        {/* Sumbu Y di kiri */}
        <Axis
          id={"y-axis"}
          scale={yScale}
          orient="left"
          transform="translate(0,0)"
        />
      </g>
    </svg>
  );
};

export const Legend = () => {
  const axisLegendRef = useRef();
  const margin = { top: 40, right: 30, bottom: 50, left: 80 };

  const xScale = d3
    .scaleLinear()
    .domain([1.8, 13.8])
    .range([0, 400 - margin.left - margin.right]);

  useEffect(() => {
    const axisGenerator = d3
      .axisBottom(xScale)
      .tickValues(d3.range(2.8, 12.9, 1.11))
      .tickFormat(d3.format(".1f"));
    d3.select(axisLegendRef.current).call(axisGenerator);
  });

  const colorScaleLegend = [
    "#4575B4",
    "#74ADD1",
    "#ABD9E9",
    "#E0F3F8",
    "#FFFFBF",
    "#FEE090",
    "#FDAE61",
    "#F46D43",
    "#D73027",
  ];

  return (
    <svg width={500} height={100}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g id="legend" ref={axisLegendRef} />
        {colorScaleLegend.map((color, i) => (
          <rect
            key={i}
            x={xScale(i * 1.12 + 2.75)}
            y={-25.5}
            width={27}
            height={25}
            fill={color}
            stroke="black"
          />
        ))}
      </g>
    </svg>
  );
};
