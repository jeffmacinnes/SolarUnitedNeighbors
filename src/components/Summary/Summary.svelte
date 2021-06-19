<script>
  // Load the Observable runtime and inspector.
  import {
    Runtime,
    Inspector,
  } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import notebook from "https://api.observablehq.com/d/3cc5b6fd64a37329.js?v=3";

  const module = new Runtime().module(notebook);

  const importData = async () => {
    console.log("here");
    const value = await module.value("exportByDay");
    console.log("here", value);
  };
  importData();
</script>

<section id="summary">
  <h2>Summary Section</h2>
</section>

<style>
  #summary {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
</style>
