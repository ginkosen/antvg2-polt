import { OverlappedComboPlot } from "@antv/g2plot";
const data = [
  { time: "10:10", call: 4, waiting: -122, people: 122 },
  { time: "10:15", call: 2, waiting: 6, people: 3 },
  { time: "10:20", call: 13, waiting: 2, people: 5 },
  { time: "10:25", call: 9, waiting: 9, people: 1 },
  { time: "10:30", call: 5, waiting: 2, people: 3 },
  { time: "10:35", call: 8, waiting: 2, people: 1 },
  { time: "10:40", call: 13, waiting: 1, people: 2 },
  { time: "10:45", call: 13, waiting: 1, people: 2 },
  { time: "10:50", call: 13, waiting: 1, people: 2 },
  { time: "11:00", call: 13, waiting: 1, people: 2 },
  { time: "11:05", call: 13, waiting: 1, people: 2 }
];

const randomDataValue = rate => {
  return Number.parseInt(Math.random() * rate, 10);
};

const options = {
  padding: [20, 10, 20, 10],
  xAxis: {
    visible: true
  },
  yAxis: {
    visible: true,
    colorMapping: true,
    synchroTick: true
  },
  legend: {
    position: "bottom-center"
  },
  layers: [
    {
      type: "column",
      title: "等待数",
      name: "等待数",
      data: data,
      xField: "time",
      yField: "waiting",
      forceFit: true,
      label: {
        visible: true,
        style: {
          fill: "#0D0E68",
          fontSize: 12
        }
      }
    },
    {
      type: "line",
      title: "呼入数",
      name: "呼入数",
      data: data,
      xField: "time",
      yField: "call",
      color: "#0D0E68",
      forceFit: true,
      axis: false,
      point: {
        visible: true,
        shape: "circle"
      },
      lineSize: 2,
      smooth: true
    },
    {
      type: "line",
      title: "人数",
      name: "人数",
      data: data,
      xField: "time",
      yField: "people",
      color: "#f8ca45",
      forceFit: true,
      axis: false,
      point: {
        visible: true,
        shape: "circle"
      },
      lineSize: 2,
      smooth: true
    }
  ]
};
const chart = new OverlappedComboPlot(
  document.getElementById("container"),
  options
);

const randomData = () => {
  data.forEach(item => {
    item.call =
      Math.random() >= 0.5 ? randomDataValue(300) : randomDataValue(300) * -1;
    item.waiting =
      Math.random() >= 0.5 ? randomDataValue(20) : randomDataValue(20) * -1;
    item.people =
      Math.random() >= 0.5 ? randomDataValue(10) : randomDataValue(10) * -1;
  });
  const first = data[0];
  let min = Math.min(first.waiting, first.people);
  let max = Math.max(first.waiting, first.people);
  data.forEach(item => {
    min = Math.min(min, Math.min(item.waiting, item.people));
    max = Math.max(max, Math.max(item.waiting, item.people));
  });
  options.layers.forEach(layer => {
    layer.data = data;
  });
  chart.updateConfig(options);
  chart.render();
};

setInterval(() => {
  randomData();
}, 5000);

randomData();
