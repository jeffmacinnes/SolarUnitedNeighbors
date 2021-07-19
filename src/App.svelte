<script>
  import { onMount } from "svelte";
  import Head from "./components/common/Head.svelte";
  import Hero from "./sections/Hero/Hero.svelte";
  import Summary from "./sections/Summary/Summary.svelte";
  import WalkThrough from "./sections/WalkThrough/WalkThrough.svelte";
  import PlanComparison from "./sections/PlanComparison/PlanComparison.svelte";
  import Resources from "./sections/Resources/Resources.svelte";
  import Nav from "./components/Nav.svelte";
  import docs from "./data/doc.json";

  // Load the Observable runtime and inspector.
  import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import notebook from "https://api.observablehq.com/d/75836c71d23e67a3@1253.js?v=3";
  const module = new Runtime().module(notebook);

  let solarUtils = { loaded: false };
  onMount(async () => {
    let cells = [
      "months",
      "generateMonthlyData",
      "generateMeanData",
      "generateMonthlyBills",
      "generateAnnualBills",
    ];
    cells.forEach(async (cellName, i) => {
      solarUtils[cellName] = await module.value(cellName);
      solarUtils.loaded = Object.keys(solarUtils).length === cells.length + 1;
    });
  });
</script>

<Head />

<div class="app-container">
  <Hero />
  <Nav />
  <Summary />
  <WalkThrough sectionText={docs.section2} {solarUtils} />
  <PlanComparison sectionText={docs.section3} {solarUtils} />
  <Resources />
</div>

<style>
</style>
