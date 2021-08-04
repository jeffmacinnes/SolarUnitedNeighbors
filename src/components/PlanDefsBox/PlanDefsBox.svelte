<script>
  export let overviewText;
  export let planDefs;

  $: console.log(overviewText);
  $: console.log(planDefs);
</script>

<div class="plan-defs-container">
  <div class="overview-container">
    <div class="overview-title _section-heading">PLAN TYPES</div>
    <div class="overview-text _body-text">{overviewText}</div>
  </div>

  <div class="plans-container">
    {#each planDefs as plan}
      <div class="plan-container">
        <div class="plan-name _heading3">{plan.plan}</div>
        <div class="plan-def _caption-text">{@html plan.definition.replace("<br><br>", "")}</div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .plan-defs-container {
    width: 100%;
    background-color: var(--charcoal);
    padding: 5rem 10rem;
    margin: 0 0 10rem;
    border-radius: 3px;
    border: solid 1px var(--white);
    box-shadow: 5px 5px 10px 4px rgba(0, 0, 0, 0.12);
  }

  .overview-container {
    border-left: solid 4px var(--green);
    padding-left: 20px;

    .overview-title {
      color: var(--white);
      font-size: 2rem;
    }

    .overview-text {
      color: var(--white);
    }
  }

  .plan-container {
    display: flex;
    width: 100%;
    margin: 4rem 0;

    .plan-name {
      color: var(--lOrange);
      flex: 0 0 15rem;
      padding: 0px;
      // border: solid 1px red;
    }

    .plan-def {
      color: var(--white);

      :global(strong) {
        color: var(--white);
      }
    }
  }
</style>
