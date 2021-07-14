<script>
  import { onMount } from "svelte";
  import Scroller from "components/common/Scroller.svelte";
  import { LayerCake, Svg, Html } from "layercake";
  import { scaleBand } from "d3-scale";
  import { sum } from "d3-array";
  import { deg2rad } from "components/utils";
  import Axes from "components/DailyChart/Axes.svelte";
  import EnergyArcs from "components/DailyChart/EnergyArcs.svelte";
  import DaylightArc from "components/DailyChart/DaylightArc.svelte";
  import Net from "components/DailyChart/Net.svelte";
  import NetLegend from "components/DailyChart/NetLegend.svelte";
  import NetSumText from "components/DailyChart/NetSumText.svelte";
  import Annotations from "components/DailyChart/Annotations.svelte";

  import { chartStates } from "./chartStates";

  export let solarUtils;

  let sampleData = [];
  let daylight = { sunrise: 6, sunset: 20 };
  $: {
    if (solarUtils.loaded) {
      // Generate sample data to use for the walk-through
      const { generateMonthlyData, months } = solarUtils;
      const panelSize = 8; // <-- hardcode inputs to generate a sample data set
      const houseSize = 1; // 2br
      const peakTime = 7; // peak energy time
      const monthIdx = 5; // month to sample from

      sampleData = generateMonthlyData(panelSize, houseSize, peakTime).filter(
        d => d.monthIdx === monthIdx // filter sample data to single month
      );

      let { sunset, sunrise } = solarUtils.months.find(d => d.monthIdx == monthIdx);
      daylight = {
        sunset,
        sunrise,
      };
    }
  }
  $: netSum = sum(sampleData, d => d.net);

  // --- Scroll state
  let index, offset, progress, count;
  let chartState = chartStates[0];
  let indexPrev;
  onMount(() => {
    indexPrev = index;
    chartState = chartStates[index];
  });

  $: if (index != indexPrev) {
    // update chart state on scroll state change
    indexPrev = index;
    if (index < chartStates.length) {
      chartState = chartStates[index];
    }
  }
</script>

<section id="walk-through">
  <Scroller threshold={0.35} bind:index bind:offset bind:progress bind:count>
    <div slot="background">
      <div class="chart-container">
        <LayerCake
          data={sampleData}
          padding={{ bottom: 40, top: 20 }}
          xScale={scaleBand().align(0)}
          xRange={[-deg2rad(90), deg2rad(90)]}
          xDomain={sampleData.map(d => d.ts)}
          yRange={[150, 270]}
          yDomain={[-6, 6]}
        >
          <Svg>
            <DaylightArc {chartState} {daylight} />
            <EnergyArcs {chartState} selectedTs={null} />
            <Axes {chartState} selectedTs={null} />
            <Net {chartState} selectedTs={null} />
          </Svg>

          <Html>
            <NetLegend {chartState} />
            <NetSumText {chartState} {netSum} delay={1200} />
          </Html>
        </LayerCake>
      </div>
    </div>

    <div slot="foreground">
      <section class="scroll-section">This is the first section.</section>
      <section class="scroll-section">This is the second section.</section>
      <section class="scroll-section">This is the third section.</section>
      <section class="scroll-section">This is the fourth section.</section>
    </div>
  </Scroller>
</section>

<style lang="scss">
  #walk-through {
    width: 100%;
    min-height: 100vh;
  }

  [slot="background"] {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  [slot="foreground"] {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    section {
      width: 400px;
      height: auto;
      margin: 100vh auto;
      padding: 10px;
      color: white;
      background-color: var(--light);
    }
  }

  .chart-container {
    width: 75vw;
    height: 50vh;
    border: solid 1px red;
  }

  .scroll-section {
    height: 50vh;
    width: 200px;
    background-color: rgba(1, 1, 1, 0.3);
  }
</style>
