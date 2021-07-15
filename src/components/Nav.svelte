<script>
  import * as scroll from "svelte-scrollto";

  const scrollTo = element => {
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
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, var(--dark) 0%, var(--light) 100%);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  }

  .links-container {
    max-width: 70%;
    display: flex;
    justify-content: space-between;

    div {
      display: inline-block;
      padding: 0 15px;
      font-family: "Roboto Condensed";
      font-size: 1.4rem;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
      color: #555;
      letter-spacing: 0.025rem;
      transition: transform 150ms;

      &:hover {
        color: #4f6b79;
        transform: translateY(-1px);
      }
    }
  }

  h1 {
    color: white;
    font-family: "Roboto Condensed";
    margin: 0px;
  }
</style>
