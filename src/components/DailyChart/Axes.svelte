<script>
  import { polar2cart, rad2deg } from "../utils.js";
  import dayjs from "dayjs";
  import { getContext } from "svelte";

  export let selectedTs = null;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");

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
      const outerY = $yScale.range()[1];
      const theta = $xScale(d.ts);
      return {
        x1: polar2cart(outerY, theta).x,
        y1: polar2cart(outerY, theta).y,
        x2: polar2cart(outerY * 1.02, theta).x,
        y2: polar2cart(outerY * 1.02, theta).y,
        xText: polar2cart(outerY * 1.05, theta).x,
        yText: polar2cart(outerY * 1.05, theta).y,
        textRotation: rad2deg(theta),
        ts: d.ts,
        text: d.ts === 12 ? "Noon" : dayjs().hour(d.ts).format("h a"),
      };
    });

  $: yGridLocs = [0, ...$yScale.domain()].map(d => {
    return {
      radius: $yScale(d),
      class: d === 0 ? "major" : "minor",
    };
  });
</script>

<defs>
  <!-- Clip Path. When used, everything within this mask will be visible -->
  <clipPath id="cut-off-bottom">
    <rect x={-$width / 2} y={-$height} width={$width} height={$height} />
  </clipPath>
</defs>

<g transform="translate({$width / 2}, {$height})">
  <!-- <rect x={-$width / 2} y={-$height} width={$width} height={$height} fill="red" opacity=".3" /> -->

  <!-- X-axis -->
  <g class="axis x-axis">
    {#each xTickVals as tick, i}
      <g>
        <line x1={tick.x1} x2={tick.x2} y1={tick.y1} y2={tick.y2} />
        <text
          transform="translate({tick.xText}, {tick.yText}) rotate({tick.textRotation})"
          text-anchor="middle">{tick.text}</text
        >
      </g>
    {/each}
  </g>

  <!-- Y-axis -->
  <g class="y-grid">
    {#each yGridLocs as yGrid}
      <circle
        class={`y-grid-line ${yGrid.class}`}
        cx="0"
        cy="0"
        r={yGrid.radius}
        fill="none"
        clip-path="url(#cut-off-bottom)"
      />
    {/each}
  </g>
</g>

<style lang="scss">
  .x-axis {
    text {
      fill: #555;
    }

    line {
      stroke: #555;
    }
  }

  .y-grid-line.major {
    stroke: #555;
    stroke-dasharray: 0;
  }

  .y-grid-line.minor {
    stroke: #ccc;
    stroke-dasharray: 2;
  }
</style>
