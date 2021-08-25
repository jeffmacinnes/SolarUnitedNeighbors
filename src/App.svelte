<script>
  import { onMount } from "svelte";
  import Head from "./components/common/Head.svelte";
  import Hero from "./sections/Hero/Hero.svelte";
  import Summary from "./sections/Summary/Summary.svelte";
  import WalkThrough from "./sections/WalkThrough/WalkThrough.svelte";
  import PlanComparison from "./sections/PlanComparison/PlanComparison.svelte";
  import Resources from "./sections/Resources/Resources.svelte";
  import Footer from "./sections/Footer/Footer.svelte";
  import Nav from "./components/Nav.svelte";
  import docs from "./data/doc.json";

  // Load the Observable runtime and inspector.
  import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import notebook from "https://api.observablehq.com/d/75836c71d23e67a3@1274.js?v=3";
  const module = new Runtime().module(notebook);

  let solarUtils = { loaded: false };
  onMount(async () => {
    let cells = [
      "plans",
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

  // Get navigation section names
  $: sectionNames = docs["navigation"].map(d => d.title);

  $: planDefs = docs.section1.planDefinitions;
</script>

<Head />

<Hero sectionText={docs.hero} />
<div class="app-container">
  <Nav {sectionNames} />
  <!-- <Summary sectionText={docs.section1} /> -->
  <WalkThrough sectionText={docs.section2} {solarUtils} />
  <!-- <PlanComparison sectionText={docs.section3} {planDefs} {solarUtils} /> -->
  <!-- <Resources sectionText={docs.section4} /> -->
  <!-- <Footer sectionText={docs.footer} /> --> -->
</div>

<style>
  .app-container {
    background-color: var(--white);
    z-index: 10;
  }
</style>
