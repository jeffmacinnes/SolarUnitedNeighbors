<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import * as d3 from "d3";

  export let chartState;
  export let netDailySum;
  export let netAggSum; // total kWh aggregated over the current interval (annual or monthly)
  export let currentMonthDisplay;
  export let delay = 0;
  const { height } = getContext("LayerCake");

  $: showNet = chartState.net;
  $: aggText =
    currentMonthDisplay !== null
      ? `${d3.format(",")(Math.round(netAggSum))} kWh month total`
      : `${d3.format(",")(Math.round(netAggSum))} kWh annually`;
</script>

{#if showNet}
  <div
    in:fade={{ delay: delay }}
    class="net-sum-container"
    style="transform: translate(0px, {$height - 125}px)"
  >
    <div class="sum">{Math.round(netDailySum)} kWh</div>
    <div class="units">
      average daily usage<br />{currentMonthDisplay !== null ? `in ${currentMonthDisplay}` : ""}
    </div>
    <div class="aggregate">{aggText}</div>
    <div class="line-break" />
  </div>
{/if}

<style lang="scss">
  .net-sum-container {
    width: 180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .sum {
    font-family: "Poppins";
    font-weight: bold;
    font-size: 3rem;
    color: var(--orange);
  }

  .aggregate {
    padding-top: 5px;
    font-weight: bold;
  }

  .line-break {
    margin: 10px auto;
    border-top: solid 1px var(--dGray);
    width: 80px;
  }

  .units {
    font-family: "Poppins";
    font-size: 11px;
    color: var(--dGray);
    font-style: normal;
    line-height: 1.3;
    padding-bottom: 3px;
  }
</style>
