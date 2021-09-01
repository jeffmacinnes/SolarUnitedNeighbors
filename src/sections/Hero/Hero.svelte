<script>
  import { LayerCake, Svg, Html } from "layercake";

  import TitleCardBg from "./TitleCardBg.svelte";
  import TitleCardText from "./TitleCardText.svelte";

  export let sectionText;

  // parallax factors
  let y;
  $: fgFactor = y * 0.4;
  $: titleFactor = y * 0.63;
  $: bgFactor = y * 0.2;

  // Set the margin to postion the top of the title card
  let innerH;
  $: titleMarginTop = innerH / 2 - 300;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={innerH} />
<section id="hero">
  <div class="full-image bg" style="transform: translate(0, {bgFactor}px);" />
  <div class="body-content" style="transform: translate(0, {titleFactor}px)">
    <div class="col-3 title-layer" style="margin-top: {titleMarginTop}px">
      <div class="title-card-container">
        <LayerCake padding={{ top: 0, left: 0 }}>
          <Svg>
            <TitleCardBg />
          </Svg>

          <Html>
            <TitleCardText title={sectionText.title} subtitle={sectionText.subtitle} />
          </Html>
        </LayerCake>
      </div>
    </div>
  </div>
  <div class="full-image fg" style="transform: translate(0, {fgFactor}px)" />
</section>

<style lang="scss">
  .fg {
    background-image: url("./assets/images/hero_mosaic_fg.png");
    background-color: transparent;
  }

  .title-layer {
    position: relative;
    height: 1200px;
    width: 100%;
    // border: solid 1px red;
  }

  .title-card-container {
    grid-area: content;
    width: 100%;
    height: 100%;
  }

  .bg {
    background-image: url("./assets/images/hero_mosaic_bg.jpg");
  }

  .full-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #hero {
    position: relative;
    top: 0;
    width: 100%;
    height: calc(100vh - 50px);
    background-color: lightgray;
    overflow: hidden;
  }
</style>
