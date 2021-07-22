<script>
  import { getContext } from "svelte";

  export let selectedTs;
  export let months;

  const { data, xScale, yScale, width, height } = getContext("LayerCake");

  $: console.log($data);
  $: console.log("months", months);
</script>
