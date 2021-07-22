<script>
  import { LayerCake, Svg, Html } from "layercake";
  import { sum, range } from "d3-array";
  import { scaleBand } from "d3-scale";
  import { deg2rad } from "components/utils";
  import SectionHeading from "components/common/SectionHeading.svelte";
  import TextBlock from "components/common/TextBlock.svelte";
  import Axes from "components/DailyChart/Axes.svelte";
  import EnergyArcs from "components/DailyChart/EnergyArcs.svelte";
  import DaylightArc from "components/DailyChart/DaylightArc.svelte";
  import Net from "components/DailyChart/Net.svelte";
  import NetLegend from "components/DailyChart/NetLegend.svelte";
  import NetSumText from "components/DailyChart/NetSumText.svelte";
  import SeasonalChart from "components/SeasonalChart/SeasonalChart.svelte";
  import Slider from "components/common/Slider.svelte";
  import PlanTable from "components/PlanTable/PlanTable.svelte";

  import { sliderOpts } from "./sliderOptions.js";

  export let solarUtils;
  export let sectionText;

  let currentDailyData = [];
  let currentMonthlyData = [];
  let months = [];
  let bills = [];
  let plans = {};
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
      const { generateMeanData, generateMonthlyData, generateMonthlyBills, generateAnnualBills } =
        solarUtils;
      const monthlyData = generateMonthlyData(panelSize, houseSize, peakTime);
      const monthlyBills = generateMonthlyBills(monthlyData);
      currentMonthlyData = monthlyData;

      // set data based on whether seasonal variation chart is interacted with or not
      if (monthIdx) {
        currentDailyData = monthlyData.filter(d => d.monthIdx === monthIdx);
        let thisMonth = months.find(d => d.monthIdx === monthIdx);
        daylight = { sunrise: thisMonth.sunrise, sunset: thisMonth.sunset };
        bills = monthlyBills
          .find(d => d.monthIdx === monthIdx)
          .plans.map(d => ({ ...d, billType: "monthly" }));
      } else {
        currentDailyData = generateMeanData(monthlyData);
        daylight = { sunrise: 6, sunset: 19 };
        bills = generateAnnualBills(monthlyBills).map(d => ({ ...d, billType: "annual" }));
      }

      // set local access to the other relevant vars from the notebook
      plans = solarUtils.plans;
      months = solarUtils.months;
    } else {
      currentDailyData = [];
      currentMonthlyData = [];
    }
  }
  $: netSum = currentDailyData ? sum(currentDailyData, d => d.net) : 0;

  $: toolTips = sectionText.sliderToolTips[0];
</script>

<section id="plan-comparison" class="body-content">
  <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
  <TextBlock text={sectionText.overview} />

  <div class="inputs-plans-container">
    <div class="inputs-container">
      <h3 class="_heading3">Adjust your energy settings</h3>
      <div class="sliders-container">
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
    </div>

    <div class="plans-container">
      <!-- PLANS -->
      <h3 class="_heading3">Compare electric plans</h3>
      <div class="plan-table-container">
        <PlanTable {bills} {plans} />
      </div>
    </div>
  </div>

  <!-- DAILY CHART GRAPHIC -->
  <div class="daily-chart-container">
    <h3 class="_heading3 daily-chart-title">Daily net energy</h3>
    <LayerCake
      data={currentDailyData}
      padding={{ bottom: 40, top: 20 }}
      xScale={scaleBand().align(0)}
      xRange={[-deg2rad(90), deg2rad(90)]}
      xDomain={currentDailyData.map(d => d.ts)}
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

  <!-- SEASONAL CHART GRAPHIC -->
  <div class="seasonal-chart-container">
    <h3 class="_heading3 seasonal-chart-title">Monthly net energy</h3>
    <LayerCake
      data={currentMonthlyData}
      xScale={scaleBand().paddingInner(0.05).align(0.5)}
      xDomain={currentMonthlyData.map(d => d.ts)}
      yScale={scaleBand().paddingInner(0.05).align(0.5)}
      yDomain={range(12)}
    >
      <Svg>
        <SeasonalChart {months} />
      </Svg>
    </LayerCake>
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

  .daily-chart-container {
    position: relative;
    width: 100%;
    height: 400px;
    max-height: 400px;
    margin-top: 20px;
  }

  .daily-chart-title {
    position: absolute;
    top: 0;
  }

  .seasonal-chart-container {
    position: relative;
    width: 100%;
    height: 400px;
    max-height: 400px;
    margin-top: 20px;
  }

  .inputs-plans-container {
    margin-top: 100px;
    width: 100%;
    display: flex;

    .inputs-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 0px;

      .sliders-container {
        padding: 0px 25px;
      }
    }

    .plans-container {
      padding: 10px 0px;
      width: 100%;

      .plan-table-container {
        padding: 0px 25px;
      }
    }
  }
</style>
