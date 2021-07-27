<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  export let sectionText;

  $: console.log(sectionText);

  $: links = sectionText.resources.map(d => ({}));
</script>

<section id="resources" class="body-content">
  <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
  <div class="col-3">
    <div class="resources-container">
      {#each sectionText.resources as resource}
        <div class="resource">
          <a class="link _body-text-bold" href={resource.link} target="_blank">{resource.name}</a>
          <p class="description _body-text">{resource.text}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  #resources {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }

  // * {
  //   border: solid 1px red;
  // }

  .resources-container {
    display: flex;
    flex-direction: column;
    grid-area: content;
  }

  .resource {
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 20px 0;

    .link {
      color: var(--green);
      font-weight: 700;
      font-size: 2rem;

      &:hover {
        opacity: 0.75;
      }
    }
  }
</style>
