<script>
  import feather from "feather-icons";

  export let name;
  export let strokeWidth;
  export let stroke;
  export let width = "1em";
  export let height = "1em";
  export let hoverable = false;

  const customIcons = [
    /* Define any custom icons not found in the feather-icons package. To get these, export as svg
      from illustrator and then copy and paste everything AFTER the svg tag to the contents property below */
    {
      name: "solarPanel",
      attrs: {
        viewBox: "0 0 36.82 32.12",
      },
      contents:
        '<defs><style>.cls-1,.cls-2{fill:none;stroke-linejoin:round;}.cls-2{stroke-linecap:round;}</style></defs> <path class="cls-1" d="M10.27,16.53a4.52,4.52,0,0,1-3.52-4.78,5,5,0,0,1,9.91-1"/><path class="cls-1" d="M16.66,10.78a5.15,5.15,0,0,1,.09,1"/><line class="cls-2" x1="11.75" y1="0.75" x2="11.75" y2="2.75"/><line class="cls-2" x1="3.97" y1="3.97" x2="5.39" y2="5.39"/><line class="cls-2" x1="0.75" y1="11.75" x2="2.75" y2="11.75"/><line class="cls-2" x1="3.97" y1="19.53" x2="5.39" y2="18.11"/><line class="cls-2" x1="18.11" y1="5.39" x2="19.53" y2="3.97"/><polygon class="cls-2" points="13.38 13.58 20.96 13.71 18.94 19.59 11.36 19.46 13.38 13.58"/><polygon class="cls-2" points="20.91 13.63 28.49 13.63 26.57 19.55 18.99 19.55 20.91 13.63"/><polygon class="cls-2" points="28.49 13.63 36.07 13.63 34.15 19.55 26.57 19.55 28.49 13.63"/><polygon class="cls-2" points="11.41 19.55 18.99 19.55 17.07 25.46 9.49 25.46 11.41 19.55"/><polygon class="cls-2" points="18.99 19.55 26.57 19.55 24.65 25.46 17.07 25.46 18.99 19.55"/><polygon class="cls-2" points="26.57 19.55 34.15 19.55 32.23 25.46 24.65 25.46 26.57 19.55"/><polygon class="cls-2" points="9.49 25.46 17.07 25.46 15.15 31.37 7.57 31.37 9.49 25.46"/><polygon class="cls-2" points="17.07 25.46 24.65 25.46 22.73 31.37 15.15 31.37 17.07 25.46"/><polygon class="cls-2" points="24.65 25.46 32.23 25.46 30.31 31.37 22.73 31.37 24.65 25.46"/>',
    },
  ];

  $: icon = customIcons.map(d => d.name).includes(name)
    ? customIcons.find(d => d.name)
    : feather.icons[name];

  $: if (icon) {
    if (stroke) icon.attrs["stroke"] = stroke;
    if (strokeWidth) icon.attrs["stroke-width"] = strokeWidth;
  }

  let opacity = 1;
  const handleMouseover = e => {
    // if there's a hover function attached to this, call it and dim the icon
    if (hoverable) {
      opacity = 0.5;
    }
  };

  const handleMouseout = e => {
    opacity = 1;
  };
</script>

{#if icon}
  <svg
    on:mouseover={handleMouseover}
    on:mouseout={handleMouseout}
    {...icon.attrs}
    style="width: {width}; height: {height}; opacity: {opacity}"
  >
    <g>
      {@html icon.contents}
    </g>
  </svg>
{/if}

<style></style>
