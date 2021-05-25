import svelte from "rollup-plugin-svelte";
import preprocess from "svelte-preprocess";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svg from "rollup-plugin-svg";
import json from "@rollup/plugin-json";
import dsv from "@rollup/plugin-dsv";
import image from "rollup-plugin-image";
import execute from "rollup-plugin-execute";

export default {
  input: "src/App.svelte",
  output: {
    format: "cjs",
    file: ".tmp/ssr.js",
  },
  plugins: [
    svelte({
      compilerOptions: { generate: "ssr" },
      emitCss: false,
      preprocess: preprocess(),
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    json(),
    dsv(),
    svg(),
    image(),
    execute("node scripts/pre-render.js"),
  ],
};
