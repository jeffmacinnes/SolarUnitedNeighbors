<script>
  export let text;

  $: paragraphs = Array.isArray(text) ? text : [{ value: text }];
</script>

<div class="col-3">
  <div class="container">
    {#each paragraphs as pText}
      <p class="_body-text">{@html pText.value}</p>
    {/each}
  </div>
</div>

<style>
  .container {
    grid-area: content;
  }

  p {
    margin-bottom: 50px;
  }

  :global(.p-intro) {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2.3rem;
    line-height: 2.9rem;
    color: var(--green);
  }

  :global(strong) {
    color: var(--green);
  }

  @media (max-width: 700px) {
    :global(.p-intro) {
      font-size: 1.6rem;
      line-height: 2.2rem;
    }
  }
</style>
