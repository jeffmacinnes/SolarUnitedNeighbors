<script>
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { usageColor, generationColor } from "./dailyChartUtils";

  import {
    Runtime,
    Inspector,
  } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import define from "https://api.observablehq.com/d/47b9ac88545c0712.js?v=3";

  export let chartState;

  const { height } = getContext("LayerCake");

  // Import the netLegend cell from Observable, overwrite legend width and color scale
  let notebookModule;
  onMount(() => {
    notebookModule = new Runtime().module(define, name => {
      if (name === "netLegend") return new Inspector(document.querySelector("#legend"));
    });
    notebookModule.redefine("legendWidth", 150);
    notebookModule.redefine("usageColor", usageColor);
    notebookModule.redefine("generationColor", generationColor);
  });

  $: showNet = chartState.net;
</script>

<div class="legend-container" style="transform: translate(0, {$height * 0.25}px);">
  {#if !showNet}
    <div transition:fade class="mask" />
  {/if}
  <div id="legend" />
</div>

<style lang="scss">
  .legend-container {
    display: flex;
    justify-content: flex-end;
  }

  .mask {
    position: absolute;
    background-color: white;
    width: 200px;
    height: 50px;
  }

  #legend {
    padding-right: 30px;
    color: #555;
  }
</style>
