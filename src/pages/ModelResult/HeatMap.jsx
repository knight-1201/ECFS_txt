import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";

function HeatMap({ heatMapX, heatMapY, heatMapData }) {
  const getOption = (heatMapX, heatMapY, heatMapData) => {
    return {
      title: {
        left: "center",
        text: "Correlation Heatmap",
      },
      tooltip: {
        position: "top",
      },
      grid: {
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: heatMapX,
        splitArea: {
          show: true,
        },
        axisLabel: {
          interval: 0,
          verticalAlign: "top",
          align: "center",
          fontSize: 10,
          width: 50,
          overflow: "truncate",
        },
        splitLine: {
          show: true,
          interval: 0,
        },
      },
      yAxis: {
        type: "category",
        data: heatMapY,
        inverse: true,

        axisLabel: {
          rotate: 0,
          align: "right",
          fontSize: 10,
          width: 50,
          overflow: "truncate",
          margin: 5,
        },
      },
      visualMap: {
        min: -1,
        max: 1,
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: "0%",
        inRange: {
          color: ["#3c4ec2", "#88abfd", "#d8dce2", "#f7b093", "#b40426"],
          symbolSize: [100, 100],
        },
        precision: 2,
        align: "left",
      },
      series: [
        {
          name: "2020",
          type: "heatmap",
          data: heatMapData,
          label: {
            show: true,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  return (
    <ReactEcharts
      option={getOption(heatMapX, heatMapY, heatMapData)}
      style={{ width: "100%" }}
    />
  );
}

export default HeatMap;
HeatMap.propTypes = {
  heatMapX: PropTypes.array,
  heatMapY: PropTypes.array,
  heatMapData: PropTypes.array,
};
