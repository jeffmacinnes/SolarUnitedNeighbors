<script>
  import { getContext } from "svelte";
  const { containerWidth, containerHeight } = getContext("LayerCake");
</script>

<div class="title-container">
  <div class="title _heading1">
    Texas <span>Solar Homeowners</span> Savings Report
  </div>

  <div class="break" />

  <div class="subtitle _heading2">
    Navigating the energy market to find the best plan to maximize your savings
  </div>
</div>

<style lang="scss">
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
  }

  .title {
    color: var(--white);

    span {
      color: var(--lOrange);
    }
  }

  .break {
    width: 80%;
    height: 1px;
    border: solid 2px var(--green);
    margin: 30px 0px;
  }

  .subtitle {
    color: var(--lOrange);
    font-size: 3rem;
    line-height: 3.47rem;
  }
</style>
