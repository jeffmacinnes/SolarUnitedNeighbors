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
    position: relative;
    padding: 4rem;
    background-color: var(--lBlue);
    border-radius: 4px;
    border: solid 1px var(--white);
    z-index: 1;
    box-shadow: 9px 9px 13px 4px rgba(0, 0, 0, 0.12);

    :after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 1.4rem;
      left: 1.4rem;
      right: 1.4rem;
      bottom: 1.4rem;
      border: 1px solid var(--white);
      border-radius: 4px;
      background: var(--lBlue);
    }
  }

  .resource {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 4rem;

    .link {
      color: var(--lOrange);
      font-weight: 400;
      font-size: 2rem;

      &:hover {
        color: var(--orange);
      }
    }

    .description {
      color: var(--white);
    }
  }
</style>
