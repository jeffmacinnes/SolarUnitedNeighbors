<script>
  export let name;
  import Icon from "./components/common/Icon.svelte";
  import Head from "./components/common/Head.svelte";
  import docs from "./data/doc.json";
</script>

<Head />
<main>
  <h1>Svelte template, {name}!</h1>

  <!-- feather icons -->
  <Icon name="airplay" strokeWidth={2} stroke="coral" />

  <!-- Text content from docs -->
  <p>{docs.intro}</p>
</main>

<style lang="scss">
  $color: coral; // #ff3e00
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: $color;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: 60vw;
    }
  }
</style>
