<script>
  import { getContext } from "svelte";
  import { colorScale } from "components/DailyChart/dailyChartUtils";

  export let selectedTs;
  export let months;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");
</script>

<g>
  <!-- CIRCLES -->
  {#each $data as circle}
    <circle
      cx={$xScale(circle.ts)}
      cy={$yScale(circle.monthIdx) + $yScale.bandwidth() / 2}
      r={7}
      fill={colorScale(circle.net)}
      stroke-width="1"
      stroke="#777"
    />
  {/each}
</g>
