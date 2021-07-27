<script>
  import { getContext } from "svelte";
  import { range } from "d3-array";
  import { scaleBand } from "d3-scale";
  const { containerWidth, containerHeight } = getContext("LayerCake");

  let strokeWidth = 10;

  $: w = $containerWidth;
  $: h = $containerHeight;

  // scale to calculate position of each pv cell
  let nCellsX = 6;
  $: cellScale = scaleBand()
    .domain(range(nCellsX))
    .range([0, w - strokeWidth])
    .padding(0.03)
    .align(0.5);

  $: cellW = cellScale.bandwidth();
  $: cells = range(Math.floor((w / cellW) * (h / cellW))).map(d => {
    const j = d % nCellsX; // col
    const i = Math.floor(d / nCellsX); // row
    return { i, j };
  });
  $: cellVerticalPadding = cellScale.padding() * cellScale.bandwidth();

  $: console.log(cells);
</script>

<filter id="dropshadow" height="130%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
  <!-- stdDeviation is how much to blur -->
  <feOffset dx="5" dy="20" result="offsetblur" />
  <!-- how much to offset -->
  <feComponentTransfer>
    <feFuncA type="linear" slope="0.3" />
    <!-- slope is the opacity of the shadow -->
  </feComponentTransfer>
  <feMerge>
    <feMergeNode />
    <!-- this contains the offset blurred image -->
    <feMergeNode in="SourceGraphic" />
    <!-- this contains the element that the filter is applied to -->
  </feMerge>
</filter>

<!-- BG -->
<rect class="card-bg" width={w} height={h} x={0} y={0} stroke-width={strokeWidth} />

<!-- pvCells -->
<g transform="translate({strokeWidth / 2}, {strokeWidth / 2 + cellVerticalPadding})">
  {#each cells as { i, j }}
    <rect
      class="pv-cell"
      width={cellW}
      height={cellW}
      x={cellScale(j)}
      y={i * cellW + cellVerticalPadding * i}
      rx="7"
      ry="7"
    />
  {/each}
</g>

<style>
  .card-bg {
    fill: #333e4f;
    stroke: var(--white);
    stroke-width: 10;
    opacity: 1;
    filter: url(#dropshadow);
  }

  .pv-cell {
    fill: var(--charcoal);
  }
</style>
