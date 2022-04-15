import { Layout } from "@components/common/Layout";
import { ActionButton } from "@components/modules/ActionButton";
import { DarkGreenButton } from "@components/ui/Button";
import withAuth from "@libs/hoc/withAuth";
import { useOrder } from "@libs/hooks/useOrder";
import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactToPrint from "react-to-print";

export default function Bill() {
  const { getOrderByOrderNumber } = useOrder();
  const [search, setOrderNumber] = useState<string>("0");
  const { data, isSuccess, refetch } = getOrderByOrderNumber(search);
  const componentToPrint = useRef(null);

  const options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
  } as any;
  options.timeZone = "UTC";
  console.log(search);
  console.log(data);

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderNumber(e.target.value);
  };

  const handleSearchCustomer = () => {
    refetch();
  };
  const getNumber = useMemo(() => {
    if (data) {
      return (
        <>
          <div
            ref={componentToPrint}
            className="flex justify-center items-center mt-10"
          >
            <div className="flex flex-col border-2 border-gray-500 w-80 p-2 space-y-2">
              <h2 className="text-center text-xl font-bold">ใบเสร็จ</h2>
              <Divider className="" orientation="left">
                รายละเอียด
              </Divider>
              <div>หมายเลขออเดอร์ : {data?.orderNumber}</div>
              <div>
                วันที่ทำรายการ :
                {new Date(data?.createdAt ?? "").toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
              <div>น้ำหนักรวม : {data?.weightTotal}</div>
              <div>ราคารวม : {data?.priceTotal}</div>
              <div>ราคาต่อหน่วย : {data?.pricePerUnit}</div>
              <div>นายจ้าง : {data?.employer}</div>
              <div>ลูกจ้าง : {data?.employee}</div>
              <Divider className="" orientation="left">
                ผู้ขาย
              </Divider>
              <div>ชื่อ-สกุล : {data?.customer?.fullName}</div>
              <div>เบอร์โทรศัทพ์ : {data?.customer?.phone}</div>
              <div>ที่อยู่ : {data?.customer?.address}</div>
              <div className="text-center text-sm font-bold">ขอบคุณที่ใช้บริการ โอกาสหน้าเชิญใหม่</div>
            </div>
          </div>
          <div className="text-center my-4">
            <ActionButton componentToPrint={componentToPrint} />
          </div>
        </>
      );
    }
  }, [data]);

  return (
    <>
      <Title level={2}>Bill</Title>
      <div className="container mx-auto">
        <div className="text-dark-green-primary mb-2">
          <span className="text-sm">Select the order number</span>
        </div>
        <div>
          <input
            className="px-2 py-2 rounded-md text-sm w-64 mr-3 border-dark-green-primary border-2"
            placeholder="Search ( order number )"
            onChange={handleSetSearch}
          />
          <DarkGreenButton
            className="text-white"
            onClick={handleSearchCustomer}
          >
            Search
          </DarkGreenButton>
        </div>
        {getNumber}
      </div>
    </>
  );
}

Bill.Layout = withAuth(Layout);
