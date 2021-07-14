<script>
  import { onMount, getContext } from "svelte";

  import {
    Runtime,
    Inspector,
  } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import define from "https://api.observablehq.com/d/47b9ac88545c0712.js?v=3";

  const { height } = getContext("LayerCake");

  // Import the legend from Observable, overwrite legend width
  let notebookModule;
  onMount(() => {
    notebookModule = new Runtime().module(define, name => {
      if (name === "myLegend") return new Inspector(document.querySelector("#legend"));
    });
    notebookModule.redefine("legendWidth", 150);
  });
</script>

<div class="legend-container" style="transform: translate(0, {$height * 0.25}px);">
  <div id="legend" />
</div>

<style lang="scss">
  .legend-container {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
  }

  #legend {
    color: #555;

    text {
      font-size: 16px !important;
    }
  }
</style>
