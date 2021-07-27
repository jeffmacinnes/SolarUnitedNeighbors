<script>
  import { LayerCake, Svg, Html } from "layercake";

  import TitleCardBg from "./TitleCardBg.svelte";
  import TitleCardText from "./TitleCardText.svelte";

  let y;

  $: fgFactor = y * 0.3;
  $: titleFactor = y * 0.55;
  $: bgFactor = y * 0.2;

  $: console.log(y);
</script>

<svelte:window bind:scrollY={y} />
<section id="hero">
  <div class="full-image bg" style="transform: translate(0, {bgFactor}px)" />
  <div class="body-content" style="transform: translate(0, {titleFactor}px)">
    <div class="col-3 title-layer">
      <div class="title-card-container">
        <LayerCake padding={{ top: 0, left: 0 }}>
          <Svg>
            <TitleCardBg />
          </Svg>

          <Html>
            <TitleCardText />
          </Html>
        </LayerCake>
      </div>
    </div>
  </div>
  <div class="full-image fg" style="transform: translate(0, {fgFactor}px)" />
</section>

<style lang="scss">
  .fg {
    background-image: url("assets/images/hero2_fg.png");
    background-color: transparent;
  }

  .title-layer {
    position: relative;
    margin-top: 20%;
    height: 1200px;
    width: 100%;
  }

  .title-card-container {
    grid-area: content;
    width: 100%;
    height: 100%;
    border: solid 1px red;
  }

  .bg {
    background-image: url("assets/images/hero2_bg.png");
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
