import PropTypes from "prop-types";
import ReactEcharts from "echarts-for-react";

function LineChart({ lineChartData }) {
  const getOption = (modelResult) => {
    const xAxisData = modelResult.map((item) => {
      const year = 2000 + parseInt(item["ym"].slice(1, 3));
      const month = item["ym"].slice(4);
      const dateObj = new Date(year, month, 1);
      let formattedDate = `${dateObj.getFullYear()}/${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}`;
      return formattedDate;
    });
    const y1AxisData = modelResult.map((item) => {
      const newActual = item["actual"] / Math.pow(10, 8);
      return newActual;
    });
    const y2AxisData = modelResult.map((item) => {
      const newPredicted = item["predicted"] / Math.pow(10, 8);
      return newPredicted;
    });
    return {
      title: {
        left: "center",
        text: "Actual vs Predicted Power Usage",
      },
      tooltip: {
        trigger: "axis",
        valueFormatter: (value) => Math.round(value * 1000) / 1000 + "億度",
      },
      grid: {
        containLabel: true,
      },
      legend: {
        left: "center",
        bottom: "0%",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
      },
      yAxis: {
        type: "value",
        scale: true,
        nameLocation: "end",
        name: "1e8",
        nameTextStyle: {
          align: "left",
          verticalAlign: "bottom",
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: "Actual",
          type: "line",
          data: y1AxisData,
          showSymbol: false,
          itemStyle: {
            opacity: 0,
          },
        },
        {
          name: "Predicted",
          type: "line",
          data: y2AxisData,
          showSymbol: false,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            type: "dashed",
          },
        },
      ],
    };
  };
  return (
    <ReactEcharts option={getOption(lineChartData)} style={{ width: "100%" }} />
  );
}

export default LineChart;
LineChart.propTypes = {
  lineChartData: PropTypes.array,
};
