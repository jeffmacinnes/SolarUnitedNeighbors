<script>
  import { getContext } from "svelte";
  export let title;
  export let subtitle;

  const { containerWidth, containerHeight } = getContext("LayerCake");
</script>

<div class="title-container">
  <div class="title _heading1">{@html title}</div>
  <div class="break" />
  <div class="subtitle _heading2">{subtitle}</div>
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

    :global(span) {
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

  @media (max-width: 700px) {
    .subtitle {
      font-size: 2.2rem;
      line-height: 2.6rem;
    }
  }
</style>
