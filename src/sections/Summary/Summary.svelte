<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  import TextBlock from "components/common/TextBlock.svelte";
  import PlanDefsBox from "components/PlanDefsBox/PlanDefsBox.svelte";
  export let sectionText;
</script>

<section id="summary">
  <div class="body-content">
    <SectionHeading section={sectionText.section} title={sectionText.subtitle} />
    <div class="col-3">
      <div class="quote _quote-text">
        {sectionText.quote1}
      </div>
    </div>
    <TextBlock text={sectionText.textBlock1} />
    <PlanDefsBox overviewText={sectionText.plansOverview} planDefs={sectionText.planDefinitions} />
    <TextBlock text={sectionText.textBlock2} />
  </div>
</section>

<style lang="scss">
  #summary {
    width: 100%;
    height: auto;
    background-color: var(--white);
  }

  .quote {
    grid-area: content;
    margin-bottom: 50px;
  }
</style>
