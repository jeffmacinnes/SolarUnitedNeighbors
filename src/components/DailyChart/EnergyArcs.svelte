<script>
  import { getContext } from "svelte";
  import { arc } from "d3-shape";

  export let chartState;
  export let selectedTs;

  const arcFn = arc();
  const { data, xScale, yScale, width, height } = getContext("LayerCake");

  $: showUsage = chartState.usage;
  $: showGeneration = chartState.generation;

  $: usageArcs = $data.map(d => {
    const arcOptions = {
      innerRadius: $yScale(0),
      outerRadius: $yScale(d.usage),
      startAngle: $xScale(d.ts),
      endAngle: $xScale(d.ts) + $xScale.bandwidth(),
      padAngle: 0.015,
    };
    return {
      d: arcFn(arcOptions),
      ...d,
    };
  });

  $: genArcs = $data.map(d => {
    const arcOptions = {
      innerRadius: $yScale(-d.generation),
      outerRadius: $yScale(0),
      startAngle: $xScale(d.ts),
      endAngle: $xScale(d.ts) + $xScale.bandwidth(),
      padAngle: 0.015,
    };
    return {
      d: arcFn(arcOptions),
      ...d,
    };
  });

  // --- Animation fns
  const buildIn = (node, { index = 0 }) => {
    // stagger add each element based on index position
    return {
      delay: index * 100,
      css: t => `opacity: ${t}`,
    };
  };
  const buildOut = (node, { index = 0 }) => {
    // stagger remove each element based on index position. First in/Last out.
    return {
      delay: ($data.length - index) * 50,
      css: t => `opacity: ${t}`,
    };
  };
</script>

<g transform="translate({$width / 2}, {$height})">
  <!-- USAGE ARCS -->
  {#if showUsage}
    {#each usageArcs as arc, index}
      <path
        class="usage"
        in:buildIn={{ index }}
        out:buildOut={{ index }}
        d={arc.d}
        opacity={!selectedTs ? 1 : selectedTs === arc.ts ? 1 : 0.3}
      />
    {/each}
  {/if}

  <!-- GENERATION ARCS -->
  {#if showGeneration}
    {#each genArcs as arc, index}
      <path
        class="generation"
        in:buildIn={{ index }}
        out:buildOut={{ index }}
        d={arc.d}
        opacity={!selectedTs ? 1 : selectedTs === arc.ts ? 1 : 0.3}
      />
    {/each}
  {/if}
</g>

<style>
  .usage {
    fill: #ccc;
    fill-opacity: 0.5;
    stroke: #ccc;
  }

  .generation {
    fill: #999;
    fill-opacity: 0.5;
    stroke: #999;
  }
</style>
