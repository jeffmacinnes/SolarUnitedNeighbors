<script>
  // Import the getContext function from svelte
  import { getContext } from "svelte";
  const { data, xGet, xScale, yScale, yGet, width } = getContext("LayerCake");
  import { tweened } from "svelte/motion";
  import { backIn, backInOut } from "svelte/easing";

  const dots = tweened(undefined, { duration: 600, easing: backInOut });

  $: {
    dots.set($data);
    //console.log("data", $data);
  }
</script>

<g>
  {#each $dots as d, i}
    <circle cx={$xScale(i)} cy={$yScale(d.y)} r={15} fill="blue" />
  {/each}
</g>
