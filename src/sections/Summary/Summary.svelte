<script>
  import SectionHeading from "components/common/SectionHeading.svelte";
  import TextBlock from "components/common/TextBlock.svelte";
  import PlanDefsBox from "components/PlanDefsBox/PlanDefsBox.svelte";
  import Figure from "components/common/Figure.svelte";

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
    <!-- Figure 1 Section -->
    <TextBlock text={sectionText.textBlock1} />
    <Figure
      imgSrc="./assets/images/Fig1@2x.png"
      title={sectionText.figures.find(p => p.fig === "1").title}
      alt={sectionText.figures.find(p => p.fig === "1").alt}
    />

    <!-- Figure 2 Section -->
    <div class="divider" />
    <TextBlock text={sectionText.textBlock2} />
    <PlanDefsBox planDefs={sectionText.planDefinitions} />
    <TextBlock text={sectionText.textBlock3} />
    <Figure
      imgSrc="./assets/images/Fig2@2x.png"
      title={sectionText.figures.find(p => p.fig === "2").title}
      alt={sectionText.figures.find(p => p.fig === "2").alt}
    />

    <!-- Figure 3 Section -->
    <div class="divider" />
    <TextBlock text={sectionText.textBlock4} />
    <Figure
      imgSrc="./assets/images/Fig3@2x.png"
      title={sectionText.figures.find(p => p.fig === "3").title}
      alt={sectionText.figures.find(p => p.fig === "3").alt}
    />
    <TextBlock text={sectionText.textBlock5} />
  </div>
</section>

<style lang="scss">
  #summary {
    width: 100%;
    height: auto;
    background-color: var(--white);
  }

  .divider {
    width: 80%;
    // border-bottom: solid 1px #ccc;
    margin: 10rem auto;
  }

  .quote {
    grid-area: content;
    margin-bottom: 50px;
  }

  @media (max-width: 700px) {
    .divider {
      width: 100%;
      margin: 4rem auto;
    }
  }
</style>
