<script>
  import RangeSlider from "svelte-range-slider-pips";
  import Icon from "components/common/Icon.svelte";
  import { tooltip } from "components/common/tooltip.js";

  export let sliderLabel = "Slider label";
  export let sliderValue = [0];
  export let icon = "";
  export let tooltipText = "";
  export let label = "";
  export let min;
  export let max;
  export let step;
  export let pipstep;
  export let pipFormat = v => v;
</script>

<div class="container">
  <div class="slider-icon-container">
    <Icon name={icon} width="50px" height="40px" strokeWidth={1.5} stroke="var(--dGray)" />
  </div>

  <div class="slider-container">
    <div class="slider-label">
      <!-- neet to wrap this in div in order to use tooltip -->
      <div
        class="help-icon-container"
        use:tooltip={{
          content: tooltipText,
          placement: "top-end",
          delay: [250, 100],
          theme: "solarUnited",
          arrow: false,
        }}
      >
        <Icon
          hoverable="true"
          name="help-circle"
          width="15px"
          height="20px"
          stroke="var(--dGray)"
          strokeWidth={2}
        />
      </div>

      <p>{sliderLabel}</p>
    </div>
    <RangeSlider
      id="slider"
      bind:values={sliderValue}
      float={false}
      range="min"
      {step}
      pips
      {pipstep}
      all="label"
      {min}
      {max}
      formatter={pipFormat}
      springValues={{ stiffness: 1, damping: 1 }}
    />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    padding: 8px 0;
    width: 100%;
  }

  .slider-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .help-icon-container {
    cursor: pointer;
  }

  .slider-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .slider-label {
    display: flex;
    align-items: center;
    font-style: italic;
    font-size: 1.2rem;
    padding-left: 10px;
    pointer-events: all;

    p {
      padding-left: 5px;
    }
  }

  :global(#slider) {
    --sliderColor: orange; // set main color
    --handle: var(--sliderColor); // glowing bit
    --handle-inactive: var(--sliderColor);
    --range-inactive: var(--sliderColor);
    --range-range: var(--sliderColor);
    --range-handle: var(--sliderColor);
    --range-handle-focus: var(--sliderColor);
  }
</style>
