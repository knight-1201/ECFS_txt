import PropTypes from "prop-types";
import ReactEcharts from "echarts-for-react";
import { useSearchParams } from "react-router-dom";

function CustomChart({ compareData }) {
  const getOption = (compareData) => {
    // const [model1, model2] = modelList.split(",");
    const model1 = compareData.model1;
    const model2 = compareData.model2;
    const xAxisData = compareData.modelsData?.map((item) => {
      const year = 2000 + parseInt(item["YM"].slice(1, 3));
      const month = item["YM"].slice(4);
      const dateObj = new Date(year, month, 1);
      let formattedDate = `${dateObj.getFullYear()}/${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}`;
      return formattedDate;
    });
    const actualPower = compareData.modelsData?.map((item) => {
      const newActual = item["Actual"] / Math.pow(10, 8);
      return newActual;
    });
    const model1Power = compareData.modelsData?.map((item) => {
      const model1Power = item[model1] / Math.pow(10, 8);
      return model1Power;
    });
    const model2Power = compareData.modelsData?.map((item) => {
      const model2Power = item[model2] / Math.pow(10, 8);
      return model2Power;
    });
    const diffData = compareData.modelsData?.map((item) => {
      const model2Gap = item[model2] - item["Actual"];
      const model1Gap = item[model1] - item["Actual"];
      const diff = ((model2Gap - model1Gap) / item["Actual"]) * 100;
      return diff;
    });
    return {
      title: {
        left: "center",
        text: "Actual vs Predicted Power Usage",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false,
          },
        },
      },
      legend: {
        data: ["Actual", model1 || "model1", model2 || "model2", "Diff%"],
        left: "center",
        bottom: "0%",
      },
      grid: {
        containLabel: false,
      },
      xAxis: [
        {
          type: "category",
          data: xAxisData,
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Power Usage",
          min: 0,
          max: 0.2,
          interval: 0.02,
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          name: "Diff%",
          min: -10,
          max: 10,
          interval: 2,
          axisLabel: {
            formatter: "{value} %",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          yAxisIndex: 0,
          filterMode: "empty",
          width: 30,
          height: "80%",
          showDataShadow: false,
          left: "1%",
        },
      ],
      series: [
        {
          name: "Actual",
          type: "line",
          showSymbol: false,
          tooltip: {
            valueFormatter: function (value) {
              return value.toFixed(4) + " 億度";
            },
          },
          data: actualPower,
        },
        {
          name: model1 || "model1",
          type: "line",
          showSymbol: false,
          tooltip: {
            valueFormatter: function (value) {
              return value.toFixed(4) + " 億度";
            },
          },
          data: model1Power,
        },
        {
          name: model2 || "model2",
          type: "line",
          showSymbol: false,
          tooltip: {
            valueFormatter: function (value) {
              return value.toFixed(4) + " 億度";
            },
          },
          data: model2Power,
        },

        {
          name: "Diff%",
          type: "bar",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value.toFixed(2) + " %";
            },
          },
          data: diffData,
        },
      ],
    };
  };
  return (
    <>
      {/* {compareData == null ? ( */}
      <ReactEcharts option={getOption(compareData)} style={{ width: "100%" }} />
      {/* ) : null} */}
    </>
  );
}

export default CustomChart;
CustomChart.propTypes = {
  compareData: PropTypes.object.isRequired,
};
