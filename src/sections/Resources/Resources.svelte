<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  export let sectionText;
</script>

<section id="resources" class="body-content">
  <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
  <div class="col-3">
    <div class="resources-container">
      {#each sectionText.resources as resource}
        <div class="resource">
          <a class="link _section-heading" href={resource.link} target="_blank">{resource.name}</a>
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
    grid-area: content;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .resource {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
    // border: solid 1px red;

    .link {
      color: var(--green);
      font-size: 2rem;
      padding-bottom: 0.5rem;

      &:hover {
        color: var(--orange);
      }
    }

    .description {
      color: var(--text);
    }
  }
</style>
