<script>
  import * as scroll from "svelte-scrollto";

  const scrollTo = (element) => {
    console.log(`scrolling to ${element}`);
    scroll.scrollTo({ element, duration: 1200 });
  };
</script>

<div id="navbar">
  <!-- Logo -->
  <div class="logo-container">
    <h1>Texas Solar Savings Report</h1>
  </div>

  <!-- Links -->
  <div class="links-container">
    <div on:click={() => scrollTo("#summary")}>Report Summary</div>
    <div on:click={() => scrollTo("#walk-through")}>Key Factors</div>
    <div on:click={() => scrollTo("#plan-comparison")}>Plan Comparison</div>
    <div on:click={() => scrollTo("#resources")}>Resources</div>
  </div>
</div>

<style lang="scss">
  $color: #f9c321;

  #navbar {
    width: 100%;
    height: 50px;
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
  }

  .links-container {
    max-width: 50%;
    display: flex;
    justify-content: space-between;

    div {
      display: inline-block;
      padding: 0 10px;
      font-family: var(--sans);
      font-weight: 300;
      text-transform: capitalize;
      cursor: pointer;
    }
  }

  h1 {
    color: $color;
    margin: 0px;
  }
</style>
