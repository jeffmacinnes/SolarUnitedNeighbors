<script>
  import Icon from "components/common/Icon.svelte";

  export let stepText;
</script>

<div class="scroller-text-container">
  <p>{@html stepText}</p>
  <div class="pulsing-arrow">
    <Icon name="chevrons-down" width="50px" height="20px" strokeWidth={2} stroke="white" />
  </div>
</div>

<style lang="scss">
  .scroller-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    height: auto;
    padding: 30px;
    background: #ffffff;
    border: 1px solid #424040;
    box-sizing: border-box;
    box-shadow: 9px 9px 13px 4px rgba(0, 0, 0, 0.12);
    border-radius: 7px;

    p {
      font-family: "Roboto";
      font-style: normal;
      font-weight: 300;
      font-size: 22px;
      margin: 0px;
      line-height: 150%;
    }
    .pulsing-arrow {
      background: rgba(#555, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(#ccc, 0.5);
      animation: pulsing 2s infinite;
    }
  }

  @keyframes pulsing {
    0% {
      transform: scale(0.8);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 15px rgba(#ccc, 0);
    }
    100% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0 rgba(#ccc, 0);
    }
  }
</style>
