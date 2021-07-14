<script>
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";

  export let chartState;
  export let netSum;
  export let delay = 0;
  const { height } = getContext("LayerCake");

  $: showNet = chartState.net;
</script>

{#if showNet}
  <div
    in:fade={{ delay: delay }}
    class="net-sum-container"
    style="transform: translate(0px, {$height * 0.7}px)"
  >
    <div class="sum">{Math.round(netSum)} (kWh)</div>
    <div class="units">daily net energy</div>
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
    font-size: 36px;
    font-weight: 700;
    padding: 10px;
    color: var(--light);
  }

  .line-break {
    margin: 10px auto;
    border-top: solid 1px #555;
    width: 100px;
  }

  .units {
    font-size: 12px;
    color: #555;
  }
</style>
