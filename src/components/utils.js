export const polar2cart = (r, theta) => {
  // convert the given polar coordinates to x,y for the chart
  theta = theta - Math.PI / 2; // rotate so 0 is at coordinate (-1, 0)
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  };
};

export const deg2rad = deg => (deg * Math.PI) / 180;

export const rad2deg = rad => rad * (180 / Math.PI);
