import withAuth from "@libs/hoc/withAuth";
import { useCustomer } from "@libs/hooks/useCustomer";
import { Layout } from "@components/common/Layout";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { UserGroupIcon } from "@heroicons/react/solid";
import { DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";
const yearFormat = "YYYY";
export default function CustomerHistory(props) {
  const { getCustomersSummary } = useCustomer();
  const [perSevenDay, setPerSevenDay] = useState<string>("");
  const [perMonth, setPerMonth] = useState<string>("");
  const [perYear, setPerYear] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  //   console.log(perSevenDay);
  //   console.log(perMonth);
  //   console.log(perYear);
  //   console.log(currentDay);

  const [meta, setMeta] = useState({
    phone: props.id,
    start: undefined,
    end: undefined,
    year: undefined,
    day: undefined,
  });
  const { data, refetch } = getCustomersSummary(meta);
  const [listOrder, setListOrder] = useState<{
    perSevenDay: number;
    perMonth: number;
    perYear: number;
    currentDay: number;
  }>();
  console.log(listOrder);

  useEffect(() => {
    if (data) {
      setListOrder(data);
      setMeta(meta);
    }
  }, [data, props.id]);

  useEffect(() => {
    refetch();
  }, [meta]);

  //   function onChangePerSevenDay(_: any, dateString: string) {
  // setPerSevenDay(dateString);
  //     setMeta(...meta, )
  //   }
  function onChangeStartPerMonth(_: any, dateString: string) {
    // setPerMonth(dateString);
    setMeta({ ...meta, start: dateString });
  }
  function onChangeEndPerMonth(_: any, dateString: string) {
    setMeta({ ...meta, end: dateString });
  }
  function onChangePerYear(_: any, dateString: string) {
    // setPerYear(dateString);
    setMeta({ ...meta, year: dateString });
  }
  function onChangeCurrentDay(_: any, dateString: string) {
    // setCurrentDay(dateString);
    setMeta({ ...meta, day: dateString });
  }

  return (
    <>
      <Title level={2}>
        <p className="text-dark-green-primary">Phone : {props.id}</p>
      </Title>

      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-2">
          {/* <DatePicker
            defaultValue={moment("2015/01/01", dateFormat)}
            format={dateFormat}
            onChange={onChangePerSevenDay}
            className="w-60"
          /> */}
          <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
            <div className="">
              <div className="uppercase text-xs">Price / 7 Day</div>
              <div className="text-xl text-gray-700">
                {listOrder?.perSevenDay} ฿
              </div>
            </div>
            <div className="w-10">
              <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
            </div>
          </div>
        </div>
        {/* ----- */}
        <div className="flex flex-col gap-2">
          <p>start</p>
          <DatePicker
            format={dateFormat}
            onChange={onChangeStartPerMonth}
            className="w-60"
          />
          <p>end</p>
          <DatePicker
            format={dateFormat}
            onChange={onChangeEndPerMonth}
            className="w-60"
          />
          <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
            <div className="">
              <div className="uppercase text-xs">Price / Month</div>
              <div className="text-xl text-gray-700">
                {listOrder?.perMonth} ฿
              </div>
            </div>
            <div className="w-10">
              <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
            </div>
          </div>
        </div>
        {/* ----- */}
        <div className="flex flex-col gap-2">
          <DatePicker
            format={yearFormat}
            onChange={onChangePerYear}
            className="w-60"
            picker="year"
          />
          <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
            <div className="">
              <div className="uppercase text-xs">Price /Year</div>
              <div className="text-xl text-gray-700">
                {listOrder?.perYear} ฿
              </div>
            </div>
            <div className="w-10">
              <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
            </div>
          </div>
        </div>
        {/* ----- */}
        <div className="flex flex-col gap-2">
          <DatePicker
            format={dateFormat}
            onChange={onChangeCurrentDay}
            className="w-60"
          />
          <div className="flex items-center justify-around w-60 h-28 bg-cream-primary">
            <div className="">
              <div className="uppercase text-xs">Price / Day</div>
              <div className="text-xl text-gray-700">
                {listOrder?.currentDay} ฿
              </div>
            </div>
            <div className="w-10">
              <UserGroupIcon className="text-dark-green-secondary h-10 w-10  mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CustomerHistory.Layout = withAuth(Layout);

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  return {
    props: { id }, // will be passed to the page component as props
  };
}
