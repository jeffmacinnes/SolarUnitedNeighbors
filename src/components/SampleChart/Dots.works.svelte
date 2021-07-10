<script>
  // Import the getContext function from svelte
  import { getContext } from "svelte";
  const { data, xGet, xScale, yScale, yGet, width } = getContext("LayerCake");
  import { tweened } from "svelte/motion";

  let areAtBottom = false;
  const getNewDots = () => {
    const newDots = areAtBottom ? [100, 200, 300] : [0, 0, 0];
    areAtBottom = !areAtBottom;
    return newDots;
  };

  const dots = tweened(getNewDots(), { duration: 400 });

  $: {
    dots.set(getNewDots());
    console.log("data", $data);
  }
</script>

<g>
  {#each $dots as d, i}
    <circle cx={$xScale(i)} cy={$yScale(d)} r={15} fill="blue" />
  {/each}
</g>
