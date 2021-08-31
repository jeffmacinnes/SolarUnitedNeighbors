<script>
  import { getContext } from "svelte";
  import { draw } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { line } from "d3-shape";
  import { polar2cart } from "../utils.js";
  import { colorScale } from "./dailyChartUtils";

  export let chartState;
  export let selectedTs;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");
  const connectorLineFn = line()
    .x(d => polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).x)
    .y(d => polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).y);

  $: showNet = chartState.net;

  $: netCircles = $data.map(d => ({
    cx: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).x,
    cy: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).y,
    ...d,
  }));

  $: netArrows = $data.map(d => {
    const showArrow = d.usage - d.net > 1.4;
    let start, end;
    if (showArrow) {
      start = polar2cart($yScale(d.usage), $xScale(d.ts) + $xScale.bandwidth() / 2);
      end = polar2cart($yScale(d.net + 1.2), $xScale(d.ts) + $xScale.bandwidth() / 2);
    } else {
      start = polar2cart($yScale(0), $xScale(d.ts) + $xScale.bandwidth() / 2);
      end = polar2cart($yScale(0), $xScale(d.ts) + $xScale.bandwidth() / 2);
    }

    return {
      ...d,
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      showArrow,
    };
  });

  // --- Animation fns
  const inStepDuration = 50;
  const outStepDuration = inStepDuration;
  const buildIn = (node, { index = 0 }) => {
    // stagger add each element based on index position
    return {
      delay: index * inStepDuration,
      css: t => `opacity: ${t > 0 ? 1 : 0}`,
    };
  };
  const buildOut = (node, { index = 0 }) => {
    // stagger remove each element based on index position. First in/Last out.
    return {
      delay: ($data.length - index) * outStepDuration,
      css: t => `opacity: ${t < 1 ? 0 : 1}`,
    };
  };
</script>

<defs>
  <marker
    id="arrow"
    viewBox="0,0,10,10"
    refX="5"
    refY="5"
    markerWidth="5"
    markerHeight="5"
    orient="auto-start-reverse"
  >
    <path class="arrowhead" d="M0,0L0,10L10,5" />
  </marker>
</defs>

<g transform="translate({$width / 2}, {$height})">
  {#if showNet}
    <!-- Net Arrows -->
    {#each netArrows as arrow, index}
      <line
        in:buildIn={{ index }}
        out:buildOut={{ index }}
        class="net-arrow"
        x1={arrow.x1}
        y1={arrow.y1}
        x2={arrow.x2}
        y2={arrow.y2}
        marker-end={`${arrow.showArrow ? "url(#arrow)" : null}`}
      />
    {/each}

    <!-- Net Connector line -->
    <path
      class="net-connector-line"
      in:draw={{ duration: $data.length * inStepDuration, easing: linear }}
      out:draw={{ duration: $data.length * outStepDuration, easing: linear }}
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
    stroke: var(--dGray);
  }

  .net-connector-line {
    stroke: var(--dGray);
    /* stroke-dasharray: 6 2; */
  }

  .arrowhead {
    stroke: "none";
    fill: #777;
  }

  .net-arrow {
    stroke-width: 1;
    stroke: var(--dGray);
    stroke-dasharray: 3 1;
  }
</style>
