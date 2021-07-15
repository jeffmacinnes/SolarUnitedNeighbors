export const chartStates = [
  // indicate which daily chart components should be shown at each state
  {
    usage: false,
    generation: false,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: false,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "noSolar",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "largeSolar",
  },
];
