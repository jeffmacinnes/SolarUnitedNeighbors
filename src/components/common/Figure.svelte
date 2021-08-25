<script>
  export let title = "";
  export let caption = "";
  export let alt = "";
  export let imgSrc;
</script>

<div class="figure-container">
  <div class="title _body-text">{title}</div>
  <img src={imgSrc} {alt} />
  <div class="caption-container">
    <div class="caption">{caption}</div>
  </div>
</div>

<style lang="scss">
  .figure-container {
    width: 90%;
    height: 100%;
    margin: 50px auto;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .title {
    margin-bottom: 10px;
    font-family: "Poppins";
    font-weight: bold;
    color: var(--lBlue);
    font-size: 1.9rem;
  }

  @media (max-width: 700px) {
    .figure-container {
      width: 100%;
      margin: 10px auto;
    }

    .title {
      font-size: 1.4rem;
    }
  }
</style>
