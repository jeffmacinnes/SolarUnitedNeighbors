import dayjs from "dayjs";

export const sliderOpts = {
  houseSize: {
    sliderLabel: "Home size",
    min: 1,
    max: 4,
    step: 0.1,
    pipstep: 10, // <-- place pip every [pipstep] steps
    pipFormat: v => {
      const idx = Math.floor(Number(v)) - 1;
      const labels = ["1br", "2br", "3br", "4br+"];
      return labels[idx];
    },
    icon: "home",
  },
  peakTime: {
    sliderLabel: "Peak usage time",
    min: 3,
    max: 15,
    step: 1,
    pipstep: 3,
    pipFormat: v =>
      `${dayjs()
        .hour(12 + v)
        .format("h a")}`,
    icon: "clock",
  },
  panelSize: {
    sliderLabel: "Solar panel output",
    min: 0,
    max: 12,
    step: 1,
    pipstep: 3,
    pipFormat: v => (v === 0 ? v : `${v}kW`),
    icon: "solarPanel",
  },
};
