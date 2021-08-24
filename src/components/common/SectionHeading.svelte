<script>
  export let section = "";
  export let title = "";
</script>

<div class="col-3">
  <div class="container">
    <h3 class="_section-heading">{section}</h3>
    <h2 class="_heading2">{title}</h2>
  </div>
</div>

<style>
  .container {
    grid-area: content;
    padding: 50px 0 50px;
  }
</style>
