import httpClient from "./httpClient";

const getChart = () => {
  return httpClient().get("/chart");
};

const ChartService = { getChart };

export default ChartService;
