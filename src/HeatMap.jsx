import { useEffect, useState } from "react";
import { fetchAPI } from "./api";
import * as d3 from "d3";
import { useModal } from "./Modal";

export const HeatMap = ({ height, width }) => {
  const [data, setData] = useState([]);
  const [baseTemperature, setBaseTemperature] = useState(0);
  const [hoveredBar, setHoveredBar] = useState(false);

  const { showModal, hideModal } = useModal();

  useEffect(() => {
    fetchAPI((data) => {
      setData(data.monthlyVariance);
      setBaseTemperature(data.baseTemperature);
    });
  }, []);

  function getColor(value) {
    if (value < 2.8) {
      return "#313695";
    } else if (value >= 2.8 && value < 3.9) {
      return "#4575B4"; // Color for values between 2.8 and 3.9
    } else if (value >= 3.9 && value < 5.0) {
      return "#74ADD1"; // Color for values between 3.9 and 5.0
    } else if (value >= 5.0 && value < 6.1) {
      return "#ABD9E9"; // Color for values between 5.0 and 6.1
    } else if (value >= 6.1 && value < 7.2) {
      return "#E0F3F8"; // Color for values between 6.1 and 7.2
    } else if (value >= 7.2 && value < 8.4) {
      return "#FFFFBF"; // Color for values between 7.2 and 8.4
    } else if (value >= 8.4 && value < 9.5) {
      return "#FEE090"; // Color for values between 8.4 and 9.5
    } else if (value >= 9.5 && value < 10.6) {
      return "#FDAE61"; // Color for values between 9.5 and 10.6
    } else if (value >= 10.6 && value < 11.7) {
      return "#F46D43"; // Color for values between 10.6 and 11.7
    } else if (value >= 11.7 && value <= 12.8) {
      return "#D73027"; // Color for values between 11.7 and 12.8
    } else {
      return "#A50026"; // Default color for values outside of range
    }
  }

  const minYear = d3.min(data, (d) => d.year);
  const maxYear = d3.max(data, (d) => d.year);
  const differenceYear = maxYear - minYear;

  return (
    <>
      {data.map((d, i) => {
        const xFormula = ((d.year - minYear) / differenceYear) * width;
        const yFormula = ((d.month - 1) / 12) * height;

        return (
          <rect
            className="bar"
            key={i}
            x={xFormula}
            y={yFormula}
            width={width / differenceYear}
            height={height / 12}
            fill={getColor(d.variance + baseTemperature)}
            onMouseEnter={() => {
              setHoveredBar(i);
              showModal(xFormula, yFormula, {...d, baseTemperature});
            }}
            onMouseLeave={() => {
              setHoveredBar(null);
              hideModal();
            }}
            stroke={hoveredBar === i ? "black" : "none"}
          />
        );
      })}
    </>
  );
};
