import { Layout } from "@components/common/Layout";
import {
  CashIcon,
  CurrencyDollarIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import withAuth from "@libs/hoc/withAuth";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useChart } from "@libs/hooks/useChart";
import { default as TitleAnd } from "antd/lib/typography/Title";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export const optionsHorizontalBar = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export default function Index() {
  const { getChart } = useChart();
  const { data: dataChart, isLoading, refetch } = getChart();
  const [pricePerUnit, setPricePerUnit] = useState<number[]>([]);
  const [priceTotal, setPriceTotal] = useState<number[]>([]);
  const [employerTotal, setEmployerTotal] = useState<number[]>([]);
  const [employeeTotal, setEmployeeTotal] = useState<number[]>([]);
  // console.log(pricePerUnit);
  console.log(priceTotal);

  useEffect(() => {
    refetch();
    const pricePerUnit = dataChart?.order.map((v: any) => v.pricePerUnit);
    const priceTotal = dataChart?.order.map((v: any) => v.priceTotal);
    const employerTotal = dataChart?.order.map((v: any) => v.employer);
    const employeeTotal = dataChart?.order.map((v: any) => v.employee);
    setPricePerUnit(pricePerUnit);
    setPriceTotal(priceTotal);
    setEmployerTotal(employerTotal);
    setEmployeeTotal(employeeTotal);
  }, [isLoading]);

  const dataBar = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "PriceTotal",
        data: priceTotal,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataLine = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "PricePerUnit",
        data: pricePerUnit,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "PriceTotal",
        data: priceTotal,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataHorizontalBar = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Employer",
        data: employerTotal,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Employee",
        data: employeeTotal,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <TitleAnd level={2}>
        <p className="text-dark-green-primary">Dashboard</p>
      </TitleAnd>
      <div className="flex flex-wrap justify-around gap-4 mt-8">
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-secondary border-4 border-dark-green-primary rounded-md">
          <div className="">
            <div className="uppercase text-xs">Total user</div>
            <div className="text-gray-700">
              <span className="text-xl font-semibold ">
                {dataChart?.totalCustomer}
              </span>{" "}
              <span className="text-base">people</span>
            </div>
          </div>
          <div className="w-10">
            <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-secondary border-4 border-dark-green-primary rounded-md">
          <div className="">
            <div className="uppercase text-xs">Total expenses</div>
            <div className="text-gray-700">
              <span className="text-xl font-semibold ">
                {dataChart?.priceTotal}
              </span>{" "}
              <span className="text-lg">฿</span>
            </div>
          </div>
          <div className="w-10">
            <CurrencyDollarIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-secondary border-4 border-dark-green-primary rounded-md">
          <div className="">
            <div className="uppercase text-xs">Total weight</div>
            <div className="text-gray-700">
              <span className="text-xl font-semibold ">
                {dataChart?.weightTotal}
              </span>{" "}
              <span className="text-base">kg</span>
            </div>
          </div>
          <div className="w-10">
            <CashIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-secondary border-4 border-dark-green-primary rounded-md">
          <div className="">
            <div className="uppercase text-xs">Total Order</div>
            <div className="text-gray-700">
              <span className="text-xl font-semibold ">
                {dataChart?.totalOrder}
              </span>{" "}
              <span className=" text-base">unit</span>
            </div>
          </div>
          <div className="w-10">
            <TagIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-secondary border-4 border-dark-green-primary rounded-md">
          <div className="">
            <div className="uppercase text-xs">Today Order</div>
            <div className="text-gray-700">
              <span className="text-xl font-semibold ">
                {dataChart?.currentOrder}
              </span>{" "}
              <span className=" text-base">unit</span>
            </div>
          </div>
          <div className="w-10">
            <TagIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto">
        <TitleAnd level={2} className="my-10">
          Graph
        </TitleAnd>
        <Line options={options} data={dataLine} />
        <TitleAnd level={2} className="mb-10 mt-16">
          Graph
        </TitleAnd>
        <Bar options={options} data={dataBar} />
        <TitleAnd level={2} className="mb-10 mt-16">
          Graph
        </TitleAnd>
        <Bar options={optionsHorizontalBar} data={dataHorizontalBar} />
      </div>
    </div>
  );
}

Index.Layout = withAuth(Layout);
