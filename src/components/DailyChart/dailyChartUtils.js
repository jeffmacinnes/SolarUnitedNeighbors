import * as d3 from "d3";

export const usageColor = "#2474ad";
export const generationColor = "#ffc038";

export const colorScale = d3
  .scaleDiverging(t => d3.interpolateRgb(1 - t))
  .domain([5, 0, -5])
  .range([usageColor, "#fff", generationColor]);
