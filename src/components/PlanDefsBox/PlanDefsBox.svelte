<script>
  export let planDefs = [];
</script>

<div class="plan-defs-container">
  <div class="plans-container">
    {#each planDefs as plan}
      <div class="plan-container col-3">
        <div class="plan-name _heading3">{plan.plan}</div>
        <div class="plan-def _body-text">{@html plan.definition.replace("<br><br>", "")}</div>
      </div>
    {:else}
      <!-- nothing -->
    {/each}
  </div>
</div>

<style lang="scss">
  .plan-defs-container {
    width: 100%;
    margin: 5rem 0 10rem;
  }

  .plan-container {
    width: 100%;
    margin: 4rem 0;
    // border: solid 1px red;

    .plan-name {
      grid-area: n;
      padding: 0px 30px;
      text-align: right;
      color: var(--orange);
    }

    .plan-def {
      grid-area: content;
      color: var(--dGray);

      :global(strong) {
        color: var(--orange);
      }
    }
  }

  @media (max-width: 700px) {
    .plan-defs-container {
      margin: 0 0 5rem;
    }

    .plan-container {
      display: flex;
      flex-direction: column;
      margin-top: 0;
      margin-bottom: 3rem;

      .plan-name {
        text-align: left;
        font-size: 1.6rem;
        padding: 0px;
      }

      .plan-def {
        font-size: 1.3rem;
      }
    }
  }
</style>
