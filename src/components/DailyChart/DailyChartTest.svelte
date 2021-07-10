<script>
  import { polar2cart, rad2deg } from "../utils.js";
  import { getContext } from "svelte";
  import { tweened } from "svelte/motion";

  import { arc } from "d3-shape";

  export let chartState;
  // export let selectedTs;

  const arcFn = arc();
  const { data, xScale, yScale, width, height } = getContext("LayerCake");

  $: showUsage = chartState.usage;
  $: showGeneration = chartState.generation;
  $: showNet = chartState.net;

  // const tweenedArcs = tweened(usageArcs, {
  //   delay: 0,
  //   duration: 750,
  // });

  $: usageArcs = $data.map(d => {
    const arcOptions = {
      innerRadius: $yScale(0),
      outerRadius: $yScale(d.usage),
      startAngle: $xScale(d.ts),
      endAngle: $xScale(d.ts) + $xScale.bandwidth(),
      padAngle: 0.015,
    };
    return {
      d: arcFn(arcOptions),
      fill: "red",
      fillOpacity: 0.4,
      stroke: "#ccc",
    };
  });
</script>

<g transform="translate({$width / 2}, {$height})">
  {#if showUsage}
    {#each usageArcs as d}
      <path d={d.d} fill="red" stroke={d.stroke} />
    {/each}
  {/if}
</g>
