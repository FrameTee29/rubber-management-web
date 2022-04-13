import { useQuery } from "react-query";

import { transformResponse } from "./transformResponse";

import ChartService from "@services/chart.service";

export function useChart() {
  const getChart = () => {
    const response = useQuery(
      "getChart",
      async () => await ChartService.getChart()
    );
    return transformResponse(response);
  };
  return { getChart };
}
