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
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { useChart } from "@libs/hooks/useChart";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart",
    },
  },
};

export default function Index() {
  const { getChart } = useChart();
  const { data: dataChart, isLoading, refetch } = getChart();
  const [pricePerUnit, setPricePerUnit] = useState<number[]>([]);
  const [priceTotal, setPriceTotal] = useState<number[]>([]);
  // console.log(pricePerUnit);
  console.log(priceTotal);

  useEffect(() => {
    refetch();
    const pricePerUnit = dataChart?.order.map((v) => v.pricePerUnit);
    const priceTotal = dataChart?.order.map((v) => v.priceTotal);
    setPricePerUnit(pricePerUnit);
    setPriceTotal(priceTotal);
  }, [isLoading]);

  const dataBar = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "PricePerUnit",
        data: pricePerUnit,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "PriceTotal",
        data: priceTotal,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      {/* <Title level={4}>Dashboard</Title> */}
      <div className="flex flex-wrap justify-around gap-4 mt-14">
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
          <div className="">
            <div className="uppercase text-xs">Total user</div>
            <div className="text-xl text-gray-700">
              {dataChart?.totalCustomer} people
            </div>
          </div>
          <div className="w-10">
            <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
          <div className="">
            <div className="uppercase text-xs">Total expenses</div>
            <div className="text-xl text-gray-700">
              {dataChart?.priceTotal} ฿
            </div>
          </div>
          <div className="w-10">
            <CurrencyDollarIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
          <div className="">
            <div className="uppercase text-xs">Total weight</div>
            <div className="text-xl text-gray-700">
              {dataChart?.weightTotal} kg
            </div>
          </div>
          <div className="w-10">
            <CashIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
          <div className="">
            <div className="uppercase text-xs">Total Order</div>
            <div className="text-xl text-gray-700">
              {dataChart?.totalOrder} unit
            </div>
          </div>
          <div className="w-10">
            <TagIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
        {/* --- */}
        <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
          <div className="">
            <div className="uppercase text-xs">Today Order</div>
            <div className="text-xl text-gray-700">
              {dataChart?.currentOrder} unit
            </div>
          </div>
          <div className="w-10">
            <TagIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full place-content-center my-auto">
        <div className="flex">
          <Pie data={data} className="w-96" />
        </div>
        <div className="flex">
          <Bar options={options} data={dataBar} />
        </div>
      </div>
    </div>
  );
}

Index.Layout = withAuth(Layout);
