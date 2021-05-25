<script>
  import feather from "feather-icons";

  export let name;
  export let strokeWidth;
  export let stroke;
  export let width = "1em";
  export let height = "1em";

  $: icon = feather.icons[name];
  $: if (icon) {
    if (stroke) icon.attrs["stroke"] = stroke;
    if (strokeWidth) icon.attrs["stroke-width"] = strokeWidth;
  }
</script>

{#if icon}
  <svg {...icon.attrs} style="width: {width}; height: {height};">
    <g>
      {@html icon.contents}
    </g>
  </svg>
{/if}

<style>
  svg {
    width: 1em;
    height: 1em;
    overflow: visible;
    transform-origin: 50% 50%;
  }
</style>
