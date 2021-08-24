<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let chartState;
  export let netSum;
  export let currentMonthDisplay;
  export let delay = 0;
  const { height } = getContext("LayerCake");

  $: showNet = chartState.net;
</script>

{#if showNet}
  <div
    in:fade={{ delay: delay }}
    class="net-sum-container"
    style="transform: translate(0px, {$height - 125}px)"
  >
    <div class="sum">{Math.round(netSum)} kWh</div>
    <div class="units">
      average daily usage<br />{currentMonthDisplay !== null ? `in ${currentMonthDisplay}` : ""}
    </div>
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
    padding: 3px;
    color: var(--orange);
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
  }
</style>
