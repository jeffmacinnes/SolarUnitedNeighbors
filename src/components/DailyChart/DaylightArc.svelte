<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { arc } from "d3-shape";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";
  import { polar2cart } from "components/utils";

  export let chartState;
  export let daylight = { sunrise: 6, sunset: 20 };

  const arcFn = arc();
  const { xScale, yScale, width, height } = getContext("LayerCake");

  $: showGeneration = chartState.generation;

  // need to create a new scale that is not a bandwidth scale
  $: daylightXScale = scaleLinear().domain(extent($xScale.domain())).range($xScale.range());

  $: daylightArc = arcFn({
    innerRadius: $yScale(-7.5),
    outerRadius: $yScale(-6.5),
    startAngle: daylightXScale(daylight.sunrise),
    endAngle: daylightXScale(daylight.sunset),
    padAngle: 0,
  });

  $: nightArc = arcFn({
    innerRadius: $yScale(-7.5),
    outerRadius: $yScale(-6.5),
    startAngle: daylightXScale(0),
    endAngle: daylightXScale(23),
    padAngle: 0,
  });
</script>

{#if showGeneration}
  <g transition:fade transform="translate({$width / 2}, {$height})">
    <path class="night-arc" d={nightArc} />
    <path class="day-arc" d={daylightArc} />
    <text
      class="daylight-label"
      x={polar2cart($yScale(-8.5), $xScale(12)).x}
      y={polar2cart($yScale(-8.5), $xScale(12)).y}
      text-anchor="middle"
      alignment-baseline="hanging">daylight</text
    >
  </g>
{/if}

<style>
  .night-arc {
    fill: slategray;
    stroke: slategray;
  }

  .day-arc {
    fill: cornsilk;
    stroke: slategray;
  }

  .daylight-label {
    font-size: 12px;
    font-style: italic;
    fill: #555;
  }
</style>
