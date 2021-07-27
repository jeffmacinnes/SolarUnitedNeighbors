<script>
  import * as scroll from "svelte-scrollto";
  export let sectionNames;

  const scrollTo = element => {
    console.log(`scrolling to ${element}`);
    scroll.scrollTo({ element, duration: 1200 });
  };
</script>

<div id="navbar">
  <!-- Logo -->
  <div class="logo-container">
    <h1>Texas <span>Solar Homeowners</span> Savings Report</h1>
  </div>

  <!-- Links -->
  <div class="links-container">
    <div on:click={() => scrollTo("#summary")}>{sectionNames[0]}</div>
    <div on:click={() => scrollTo("#walk-through")}>{sectionNames[1]}</div>
    <div on:click={() => scrollTo("#plan-comparison")}>{sectionNames[2]}</div>
    <div on:click={() => scrollTo("#resources")}>{sectionNames[3]}</div>
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
    background: linear-gradient(90deg, var(--dOrange) 0%, var(--orange) 100%);
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
      color: var(--dGray);
      letter-spacing: 0.025rem;
      transition: transform 150ms;

      &:hover {
        // color: var(--lBlue);
        transform: translateY(-1.5px);
      }
    }
  }

  h1 {
    color: var(--white);
    font-family: "Roboto Condensed";
    letter-spacing: 0.15rem;
    margin: 0px;

    span {
      color: var(--lOrange);
    }
  }
</style>
