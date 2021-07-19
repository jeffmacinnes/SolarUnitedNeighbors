<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import Scroller from "components/common/Scroller.svelte";
  import { LayerCake, Svg, Html } from "layercake";
  import { scaleBand } from "d3-scale";
  import { sum, range } from "d3-array";
  import dayjs from "dayjs";
  import { deg2rad } from "components/utils";
  import Axes from "components/DailyChart/Axes.svelte";
  import EnergyArcs from "components/DailyChart/EnergyArcs.svelte";
  import DaylightArc from "components/DailyChart/DaylightArc.svelte";
  import Net from "components/DailyChart/Net.svelte";
  import NetLegend from "components/DailyChart/NetLegend.svelte";
  import NetSumText from "components/DailyChart/NetSumText.svelte";
  import ScrollerTextBox from "components/common/ScrollerTextBox.svelte";

  import { chartStates } from "./chartStates";

  export let sectionText;
  export let solarUtils;

  const scrollSteps = sectionText.steps;

  // Set up data vars. The currentData tween MUST start with a datasets that matches structure of the real data
  let sampleDatasets = {};
  let startingData = range(24).map(d => ({
    ts: 0,
    net: 0,
    usage: 0,
    generation: 0,
    dayIdx: 156,
    monthIdx: 6,
    monthStr: "Jun",
    date: dayjs("2019-06-01"),
  }));
  let currentData = tweened(startingData, { duration: 450, easing: cubicInOut });
  let daylight = { sunrise: 6, sunset: 20 };

  $: {
    if (solarUtils.loaded) {
      // Generate sample datasets to use for the walk-through
      const { generateMonthlyData, months } = solarUtils;
      let panelSize = 6; // <-- hardcode inputs to generate a sample data set
      const houseSize = 1; // 2br
      const peakTime = 6; // peak energy time
      const monthIdx = 5; // month to sample from

      // Typical dataset
      sampleDatasets["typical"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(
        d => d.monthIdx === monthIdx // filter sample data to single month
      );

      // No solar dataset
      panelSize = 0;
      sampleDatasets["noSolar"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(
        d => d.monthIdx === monthIdx // filter sample data to single month
      );

      // Big
      panelSize = 12;
      sampleDatasets["largeSolar"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(
        d => d.monthIdx === monthIdx // filter sample data to single month
      );

      // update currentData tween store with the first dataset
      currentData.set(sampleDatasets[chartStates[0].data]);

      // set sunrise and sunset
      let { sunset, sunrise } = months.find(d => d.monthIdx == monthIdx);
      daylight = {
        sunset,
        sunrise,
      };
    }
  }
  $: netSum = $currentData ? sum($currentData, d => d.net) : 0;

  // --- Scroll state
  let index, offset, progress, count;
  let indexPrev;
  let chartState = chartStates[0];
  onMount(() => {
    indexPrev = index;
  });

  $: if (indexPrev !== index) {
    // update chart state on scroll state change
    indexPrev = index;
    if (index < chartStates.length) {
      chartState = chartStates[index];
      currentData.set(solarUtils.loaded ? sampleDatasets[chartState.data] : startingData);
    }
  }
</script>

<section id="walk-through" class="body-content">
  <Scroller threshold={0.65} bind:index bind:offset bind:progress bind:count>
    <div slot="background">
      <div class="chart-container">
        <LayerCake
          data={$currentData}
          padding={{ bottom: 40, top: 20 }}
          xScale={scaleBand().align(0)}
          xRange={[-deg2rad(90), deg2rad(90)]}
          xDomain={$currentData.map(d => d.ts)}
          yRange={[150, 270]}
          yDomain={[-6, 6]}
        >
          <Svg>
            <DaylightArc {chartState} {daylight} />
            <EnergyArcs {chartState} selectedTs={null} />
            <Axes selectedTs={null} />
            <Net {chartState} selectedTs={null} />
          </Svg>

          <Html>
            <NetLegend {chartState} id="walkthrough-legend" />
            <NetSumText {chartState} {netSum} delay={1200} />
          </Html>
        </LayerCake>
      </div>
    </div>

    <div slot="foreground">
      {#each scrollSteps as step}
        <section class="scroll-section">
          <ScrollerTextBox stepText={step.text} />
        </section>
      {/each}
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
    align-items: center;
  }

  [slot="foreground"] {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    section {
      width: 60%;
      max-width: 500px;
      height: auto;
      margin: 50vh auto;

      &:first-of-type {
        margin: 80vh auto; // make first section lower down
      }
    }
  }

  .chart-container {
    margin-top: 10vh;
    width: 100%;
    height: 100%;
    max-height: 400px;
  }
</style>
