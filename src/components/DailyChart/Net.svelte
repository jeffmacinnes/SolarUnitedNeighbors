<script>
  import { getContext } from "svelte";
  import { draw } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { polar2cart, rad2deg } from "../utils.js";
  import { line } from "d3-shape";
  import { interpolateRdBu } from "d3-scale-chromatic";
  import { scaleDiverging } from "d3-scale";

  export let chartState;
  export let selectedTs;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");
  const connectorLineFn = line()
    .x(d => polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).x)
    .y(d => polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).y);

  const colorScale = scaleDiverging(t => interpolateRdBu(1 - t)).domain([-5, 0, 5]);

  $: showNet = chartState.net;

  $: netCircles = $data.map(d => ({
    cx: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).x,
    cy: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).y,
    ...d,
  }));

  // --- Animation fns
  const buildIn = (node, { index = 0 }) => {
    // stagger add each element based on index position
    return {
      delay: index * 100,
      css: t => `opacity: ${t > 0 ? 1 : 0}`,
    };
  };
  const buildOut = (node, { index = 0 }) => {
    // stagger remove each element based on index position. First in/Last out.
    return {
      delay: ($data.length - index) * 50,
      css: t => `opacity: ${t < 1 ? 0 : 1}`,
    };
  };
</script>

<g transform="translate({$width / 2}, {$height})">
  {#if showNet}
    <!-- Net Connector line -->
    <path
      class="net-connector-line"
      in:draw={{ duration: $data.length * 100, easing: linear }}
      out:draw={{ duration: $data.length * 50, easing: linear }}
      d={connectorLineFn($data)}
      fill="none"
      stroke-dasharray="6 2"
    />

    <!-- Net Circles -->
    {#each netCircles as circle, index}
      <circle
        class="net-circle"
        in:buildIn={{ index }}
        out:buildOut={{ index }}
        cx={circle.cx}
        cy={circle.cy}
        r="7"
        fill={colorScale(circle.net)}
      />
    {/each}
  {/if}
</g>

<style>
  .net-circle {
    stroke: #555;
  }

  .net-connector-line {
    stroke: #555;
    /* stroke-dasharray: 6 2; */
  }
</style>
