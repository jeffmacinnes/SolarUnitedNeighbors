<script>
  import { onMount } from "svelte";
  import Scroller from "components/common/Scroller.svelte";
  import { LayerCake, Svg, Html } from "layercake";
  import { randomInt } from "d3-random";
  import Dots from "./Dots.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";

  export let solarUtils;
  $: console.log(solarUtils);

  let points = [
    { x: 0, y: 0, text: "A" },
    { x: 1, y: 10, text: "B" },
    { x: 2, y: 3, text: "C" },
  ];

  let offset, progress;

  // Scroll state
  let index = [];
  let indexPrev = [];
  onMount(() => {
    indexPrev = [...index];
  });

  // Reactive code to trigger CHART actions
  $: if (index[0] != indexPrev[0]) {
    indexPrev[0] = index[0];

    if (index[0] === 1) {
      points = points.map((d) => {
        let { y, ...other } = d;
        return {
          y: randomInt(1, 10)(),
          ...other,
        };
      });
    }
  }
</script>

<section id="walk-through">
  <Scroller threshold={0.85} bind:index={index[0]} bind:offset bind:progress>
    <div slot="background">
      <div class="chart-container">
        <LayerCake
          data={points}
          x="x"
          y="y"
          yDomain={[0, 10]}
          padding={{ top: 20, right: 50, bottom: 50, left: 20 }}
        >
          <Svg>
            <AxisX />
            <AxisY />
            <Dots />
          </Svg>
        </LayerCake>
      </div>
    </div>

    <div slot="foreground">
      <section class="scroll-section">This is the first section.</section>
      <section class="scroll-section">This is the second section.</section>
      <section class="scroll-section">This is the third section.</section>
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
      background-color: red;
    }
  }

  .chart-container {
    width: 75vw;
    height: 300px;
    border: solid 1px red;
  }

  .scroll-section {
    height: 50vh;
    width: 200px;
    background-color: rgba(1, 1, 1, 0.3);
  }
</style>
