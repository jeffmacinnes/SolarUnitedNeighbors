<script>
  import { polar2cart, rad2deg } from "../utils.js";
  import dayjs from "dayjs";
  import { getContext, tick } from "svelte";

  export let selectedTs = null;

  const { data, xScale, yScale, yDomain, width, height } = getContext("LayerCake");

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

  $: yGridLocs = [0, ...$yDomain].map(d => {
    return {
      radius: $yScale(d),
      class: d === 0 ? "major" : "minor",
    };
  });

  $: yTickVals = $xScale.range().flatMap((xPos, xIdx) => {
    const isLeftTicks = xIdx === 0;
    return [0, ...$yDomain].map(yPos => {
      let textAnchor, label;
      if (isLeftTicks) {
        textAnchor = yPos === 0 ? "middle" : Math.sign(yPos) === 1 ? "start" : "end";
        label =
          yPos === 0 ? yPos : Math.sign(yPos) === 1 ? `${yPos} kWh ⟵` : `⟶ ${Math.abs(yPos)} kWh`;
      } else {
        textAnchor = yPos === 0 ? "middle" : Math.sign(yPos) === 1 ? "end" : "start";
        label =
          yPos === 0 ? yPos : Math.sign(yPos) === 1 ? `⟶ ${yPos} kWh` : `${Math.abs(yPos)} kWh ⟵`;
      }
      return {
        x: polar2cart($yScale(yPos * 1.15), xPos).x,
        y: polar2cart($yScale(yPos * 1.15), xPos).y + 10,
        anchor: textAnchor,
        text: label,
        yVal: yPos,
      };
    });
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

  <!-- Y-grid -->
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

  <!-- Y-axis labels -->
  <g class="y-axis">
    {#each yTickVals as tick, i}
      <text
        transform="translate({tick.x}, {tick.y})"
        font-size="12px"
        alignment-baseline="hanging"
        text-anchor={tick.anchor}
      >
        {tick.text}
        {#if tick.yVal !== 0}
          <tspan font-style="italic" x="0" dy="25">
            {#if Math.sign(tick.yVal) === 1}
              usage
            {:else}
              generation
            {/if}
          </tspan>
        {/if}
      </text>
    {/each}
  </g>
</g>

<style lang="scss">
  .x-axis {
    text {
      fill: var(--dGray);
      font-size: 1.4em;
    }

    line {
      stroke: var(--dGray);
    }
  }

  .y-axis {
    text {
      fill: var(--dGray);
      font-size: "6px";
    }
  }

  .y-grid-line.major {
    stroke: var(--dGray);
    stroke-dasharray: 0;
  }

  .y-grid-line.minor {
    stroke: #ccc;
    stroke-dasharray: 2;
  }
</style>
