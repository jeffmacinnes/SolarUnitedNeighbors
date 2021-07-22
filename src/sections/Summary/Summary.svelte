<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  import TextBlock from "components/common/TextBlock.svelte";
  export let sectionText;
</script>

<section id="summary">
  <div class="body-content">
    <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
    <TextBlock text={sectionText.textBlock1} />
  </div>
</section>

<style lang="scss">
  #summary {
    width: 100%;
    height: auto;
    background-color: var(--white);
  }
</style>
