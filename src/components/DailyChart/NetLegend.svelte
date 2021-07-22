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
  export let id = "legend-div"; // must name the id of the element you want to inject the legend into

  const { height } = getContext("LayerCake");

  // Import the netLegend cell from Observable, overwrite legend width and color scale
  let notebookModule;
  onMount(() => {
    notebookModule = new Runtime().module(define, name => {
      if (name === "netLegend") return new Inspector(document.querySelector(`#${id}`));
    });
    notebookModule.redefine("legendWidth", 150);
    notebookModule.redefine("usageColor", usageColor);
    notebookModule.redefine("generationColor", generationColor);
  });

  $: showNet = chartState.net;
</script>

<div class="legend-container" style="transform: translate(0, {$height * 0.5 - 130}px);">
  {#if !showNet}
    <div transition:fade class="mask" />
  {/if}
  <div class="legend" {id} />
</div>

<style lang="scss">
  .legend-container {
    display: flex;
    justify-content: flex-end;
  }

  .mask {
    position: absolute;
    background-color: var(--white);
    width: 200px;
    height: 50px;
  }

  .legend {
    padding-right: 30px;
    color: var(--dGray);
  }

  .title {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode",
      Geneva, Verdana, sans-serif;
  }
</style>
