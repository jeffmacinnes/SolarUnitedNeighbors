<script>
  import { getContext } from "svelte";
  import dayjs from "dayjs";
  import { colorScale } from "components/DailyChart/dailyChartUtils";

  export let selectedTs;
  export let months = [];
  export let handleMouse;
  export let monthIdx = null;

  const { data, xScale, yScale, xRange, width, height } = getContext("LayerCake");

  // Prep the hour labels
  $: xTickVals = $data
    .filter(d => {
      if (selectedTs) {
        return d.ts === selectedTs; // <- only show selected tick mark
      } else {
        return (d.ts !== 0) & (d.ts % 3 === 0);
      }
    })
    .map((d, i) => {
      const xPos = $xScale(d.ts) - $xScale.bandwidth() / 2;
      const yPos = $yScale(0) + radius * 2;
      return {
        x1: xPos,
        y1: yPos + 1,
        x2: xPos,
        y2: yPos + 5,
        xText: xPos,
        yText: yPos + 10,
        ts: d.ts,
        text: d.ts === 12 ? "Noon" : dayjs().hour(d.ts).format("h a"),
      };
    });
  $: radius = 9;
  $: console.log("here", monthIdx);
</script>

<g transform="translate({$width / 2}, {0})">
  <!-- MOUSEOVER EVENTS -->
  {#each months as month}
    <rect
      x={$xScale(0) - $xScale.bandwidth()}
      y={$yScale(month.monthIdx)}
      width={$xRange[1] - $xRange[0] + $xScale.bandwidth()}
      height={$yScale.bandwidth() + 1}
      fill="#fff"
      on:mousemove={() => handleMouse(month.monthIdx)}
      on:mouseout={() => handleMouse(null)}
    />
  {/each}

  <g class="top-layer">
    <!-- Month Axes -->
    {#each months as month}
      <text
        text-anchor="end"
        alignment-baseline="middle"
        x={$xScale(0) - radius * 2}
        y={$yScale(month.monthIdx) + $yScale.bandwidth() / 2}
        opacity={!monthIdx ? 1 : monthIdx === month.monthIdx ? 1 : 0.3}>{month.dateStr}</text
      >
      <line
        x1={$xScale(0) - radius * 1.5}
        y1={$yScale(month.monthIdx) + $yScale.bandwidth() / 2}
        x2={$xScale(23) + radius * 1.5}
        y2={$yScale(month.monthIdx) + $yScale.bandwidth() / 2}
        opacity={!monthIdx ? 1 : monthIdx === month.monthIdx ? 1 : 0}
      />
      <text
        text-anchor="start"
        alignment-baseline="middle"
        x={$xScale(23) + radius * 2}
        y={$yScale(month.monthIdx) + $yScale.bandwidth() / 2}
        opacity={!monthIdx ? 1 : monthIdx === month.monthIdx ? 1 : 0.3}>{month.dateStr}</text
      >
    {/each}

    <!-- Time Axis  -->
    {#each xTickVals as xTick}
      <line x1={xTick.x1} y1={xTick.y1} x2={xTick.x2} y2={xTick.y2} />
      <text x={xTick.xText} y={xTick.yText} text-anchor="middle" alignment-baseline="hanging"
        >{xTick.text}</text
      >
    {/each}

    <!-- CIRCLES -->
    {#each $data as circle}
      <circle
        cx={$xScale(circle.ts)}
        cy={$yScale(circle.monthIdx) + $yScale.bandwidth() / 2}
        r={7}
        fill={colorScale(circle.net)}
        stroke-width="1"
        stroke="#777"
        opacity={!monthIdx ? 1 : monthIdx === circle.monthIdx ? 1 : 0.3}
      />
    {/each}
  </g>
</g>

<style>
  .top-layer {
    pointer-events: none;
  }

  rect {
    cursor: pointer;
  }

  text {
    /* text-transform: capitalize;
    font-family: "Roboto";
    font-weight: 500; */
    font-size: 1.4rem;
    fill: var(--dGray);
  }

  line {
    stroke: var(--dGray);
  }
</style>
