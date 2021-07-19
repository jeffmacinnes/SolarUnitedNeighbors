<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { sum } from "d3-array";
  import { scaleBand } from "d3-scale";
  import { deg2rad } from "components/utils";
  import Axes from "components/DailyChart/Axes.svelte";
  import EnergyArcs from "components/DailyChart/EnergyArcs.svelte";
  import DaylightArc from "components/DailyChart/DaylightArc.svelte";
  import Net from "components/DailyChart/Net.svelte";
  import NetLegend from "components/DailyChart/NetLegend.svelte";
  import NetSumText from "components/DailyChart/NetSumText.svelte";
  import Slider from "components/common/Slider.svelte";
  import PlanTable from "components/PlanTable/PlanTable.svelte";

  import { sliderOpts } from "./sliderOptions.js";

  export let solarUtils;
  export let sectionText;

  let currentData = [];
  let bills = [];
  let daylight = { sunrise: 6, sunset: 19 };
  let chartState = {
    usage: true,
    generation: true,
    net: true,
  };

  // Slider Defaults
  let houseSize = [0];
  let peakTime = [6];
  let panelSize = [6];

  // Seasonal Variation chart vars (null if nothing selected)
  let monthIdx = null;
  let tsIdx = null;

  $: {
    if (solarUtils.loaded) {
      /* Generate monthly dataset (generate data first day of each month month)
        given the current input parameters */
      const {
        months,
        generateMeanData,
        generateMonthlyData,
        generateMonthlyBills,
        generateAnnualBills,
      } = solarUtils;
      const monthlyData = generateMonthlyData(panelSize, houseSize, peakTime);
      const monthlyBills = generateMonthlyBills(monthlyData);

      // set data based on whether seasonal variation chart is interacted with or not
      if (monthIdx) {
        currentData = monthlyData.filter(d => d.monthIdx === monthIdx);
        let thisMonth = months.find(d => d.monthIdx === monthIdx);
        daylight = { sunrise: thisMonth.sunrise, sunset: thisMonth.sunset };
        bills = monthlyBills
          .find(d => d.monthIdx === monthIdx)
          .plans.map(d => ({ ...d, billType: "monthly" }));
      } else {
        currentData = generateMeanData(monthlyData);
        daylight = { sunrise: 6, sunset: 19 };
        bills = generateAnnualBills(monthlyBills).map(d => ({ ...d, billType: "annual" }));
      }
    } else {
      currentData = [];
    }
  }
  $: netSum = currentData ? sum(currentData, d => d.net) : 0;

  $: toolTips = sectionText.sliderToolTips[0];
</script>

<section id="plan-comparison" class="body-content">
  <div class="chart-container">
    <!-- MAIN GRAPHIC -->
    <LayerCake
      data={currentData}
      padding={{ bottom: 40, top: 20 }}
      xScale={scaleBand().align(0)}
      xRange={[-deg2rad(90), deg2rad(90)]}
      xDomain={currentData.map(d => d.ts)}
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
        <NetLegend id="plancomparison-legend" {chartState} />
        <NetSumText {chartState} {netSum} delay={1200} />
      </Html>
    </LayerCake>
  </div>

  <div class="inputs-plans-container">
    <div class="inputs-container">
      <!-- INPUTS -->
      <Slider
        tooltipText={toolTips.homeSize}
        {...sliderOpts.houseSize}
        bind:sliderValue={houseSize}
      />
      <Slider
        tooltipText={toolTips.peakTime}
        {...sliderOpts.peakTime}
        bind:sliderValue={peakTime}
      />
      <Slider
        tooltipText={toolTips.panelSize}
        {...sliderOpts.panelSize}
        bind:sliderValue={panelSize}
      />
    </div>

    <div class="plans-container">
      <!-- PLANS -->
      <PlanTable {bills} />
    </div>
  </div>
</section>

<style lang="scss">
  #plan-comparison {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }
  // * {
  //   border: solid 1px red;
  // }

  .chart-container {
    margin-top: 10vh;
    width: 100%;
    height: 400px;
    max-height: 400px;
  }

  .inputs-plans-container {
    margin-top: 100px;
    width: 100%;
    display: flex;

    .inputs-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px;
    }

    .plans-container {
      padding: 10px;
      width: 100%;
    }
  }
</style>
