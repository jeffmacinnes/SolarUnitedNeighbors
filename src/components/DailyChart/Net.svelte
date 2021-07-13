<script>
  import { getContext } from "svelte";
  import { polar2cart, rad2deg } from "../utils.js";

  export let chartState;
  export let selectedTs;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");

  $: showNet = chartState.net;

  $: netCircles = $data.map(d => ({
    cx: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).x,
    cy: polar2cart($yScale(d.net), $xScale(d.ts) + $xScale.bandwidth() / 2).y,
  }));

  $: console.log(netCircles);
</script>

<g transform="translate({$width / 2}, {$height})">
  <!-- Net Circles -->
  {#if showNet}
    {#each netCircles as circle}
      <circle cx={circle.cx} cy={circle.cy} r="7" fill="red" />
    {/each}
  {/if}
</g>
