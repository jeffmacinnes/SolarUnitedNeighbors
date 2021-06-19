<script>
  import { onMount } from "svelte";
  import Scroller from "../common/Scroller.svelte";
  let offset, progress;

  // Scroll state
  let index = [];
  let indexPrev = [];
  onMount(() => {
    indexPrev = [...index];
    console.log("here", index, indexPrev);
  });

  // Reactive code to trigger CHART actions
  $: if (index[0] != indexPrev[0]) {
    console.log(index, indexPrev);
    indexPrev[0] = index[0];
  }
</script>

<section id="walk-through">
  <Scroller threshold={0.65} bind:index={index[0]} bind:offset bind:progress splitscreen={true}>
    <div slot="background">
      <p>
        This is the background content. It will stay fixed in place while the foreground scrolls
        over the top.
      </p>

      <p>Section {index[0] + 1} is currently active.</p>
    </div>

    <div slot="foreground">
      <section class="scroll-section">This is the first section.</section>
      <section class="scroll-section">This is the second section.</section>
      <section class="scroll-section">This is the third section.</section>
    </div>
  </Scroller>
</section>

<style>
  #walk-through {
    width: 100%;
    min-height: 100vh;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    background-color: lightgray;
  }
  .scroll-section {
    height: 50vh;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.3);
  }
</style>
