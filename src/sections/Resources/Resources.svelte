<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  import Icon from "components/common/Icon.svelte";

  export let sectionText;

  $: console.log(sectionText);
</script>

<div class="divider" />

<section id="resources" class="body-content">
  <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
  <div class="col-3">
    <div class="resources-container">
      {#each sectionText.resources as resource}
        <div class="resource">
          <Icon name="link" stroke="var(--green)" strokeWidth={2} width={30} height={30} />
          <div class="resource-content">
            <a class="link _section-heading" href={resource.link} target="_blank">{resource.name}</a
            >
            <p class="description _body-text">{resource.text}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .divider {
    width: 80%;
    border-bottom: solid 1px #ccc;
    margin: 10rem auto;
  }

  #resources {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  }

  .resources-container {
    grid-area: content;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }

  .resource {
    display: flex;
  }

  .resource-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem 2rem;
    // border: solid 1px red;

    .link {
      color: var(--green);
      font-size: 2rem;
      padding-bottom: 0rem;

      &:hover {
        color: var(--orange);
      }
    }

    .description {
      color: var(--text);
    }
  }
</style>
