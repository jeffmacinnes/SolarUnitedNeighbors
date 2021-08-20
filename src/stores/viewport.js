// import { browser } from '$app/env';
import { readable } from "svelte/store";
import debounce from "lodash.debounce";

export default readable({ width: 0, height: 0 }, set => {
  const onResize = () => set({ width: window.innerWidth, height: window.innerHeight });

  onResize();
  window.addEventListener("resize", debounce(onResize, 250));
  // if (browser) {
  // 	onResize();
  // 	window.addEventListener('resize', debounce(onResize, 250));
  // }

  return () => {
    // if (browser) window.removeEventListener('resize', onResize);
    window.removeEventListener("resize", onResize);
  };
});
