import { interpolateRgb } from "d3-scale-chromatic";
import { scaleDiverging } from "d3-scale";

export const usageColor = "#2474ad";
export const generationColor = "#ffc038";

export const colorScale = scaleDiverging(t => interpolateRgb(1 - t))
  .domain([5, 0, -5])
  .range([usageColor, "#fff", generationColor]);
