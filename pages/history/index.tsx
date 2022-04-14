import Title from "antd/lib/typography/Title";

import withAuth from "@libs/hoc/withAuth";
import { Layout } from "@components/common/Layout";
import { useOrder } from "@libs/hooks/useOrder";
import { useEffect, useState } from "react";
import { TOrder } from "types/order.type";
import { Modal, Pagination } from "antd";
import Link from "next/link";

export default function History() {
  const { getOrder } = useOrder();
  const [listOrder, setListOrder] = useState<TOrder[]>([]);
  const [viewOrder, setViewOrder] = useState<TOrder>();
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    key: "phone",
    search: "",
  });
  const { data: listOrderData, refetch } = getOrder(meta);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (listOrderData) {
      setListOrder(listOrderData.items);
      setMeta(meta);
    }
  }, [listOrderData]);

  useEffect(() => {
    refetch();
  }, [meta]);

  const handleChangePage = (page: number) => {
    setMeta({ ...meta, page });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOrder = (item: any) => {
    setViewOrder(item);
    showModal();
  };

  return (
    <>
      <Modal
        title="Order item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {viewOrder?.orderItems.map((order, index) => {
          return (
            <div className="grid grid-cols-2">
              <div className="">ชั่งครั้งที่ {index + 1} :</div>
              <div className="">{order.weight} kg.</div>
            </div>
          );
        })}
      </Modal>
      <div className="container mx-auto">
        <div className="w-full">
          <Title level={2}>
            <p className="text-dark-green-primary">History</p>
          </Title>
          <div className="mx-auto grid grid-cols-9 w-full rounded gap-4 text-white bg-dark-green-primary font-semibold px-1 py-2 border-2 border-dark-green-primary  text-base">
            <div className="text-center">No</div>
            <div>CreatedAt</div>
            <div>Customer name</div>
            <div>Total Weight</div>
            <div>Total price</div>
            <div>Price/Unit</div>
            <div>Employer</div>
            <div>Employee</div>
            <div>Action</div>
          </div>
          {listOrder?.map((item) => {
            return (
              <>
                <div
                  key={item.id}
                  className="mx-auto grid grid-cols-9 items-center rounded gap-4 border-2 w-full  border-dark-green-primary bg-cream-secondary my-2 font-medium py-1"
                >
                  <div className="text-center">{item.orderNumber}</div>
                  <div>{item.createdAt}</div>
                  <div>{item.customer.fullName}</div>
                  <div>{item.weightTotal}</div>
                  <div>{item.priceTotal}</div>
                  <div>{item.pricePerUnit}</div>
                  <div>{item.employer}</div>
                  <div>{item.employee}</div>
                  <div className="grid grid-cols-2 gap-1 mx-1">
                    <button
                      onClick={() => handleOrder(item)}
                      className="text-white bg-dark-green-secondary p-2 rounded-md"
                    >
                      View
                    </button>
                    <Link href={`/history/${item.customer.phone}`}>
                      <a>
                        <button className="text-white bg-dark-green-secondary p-2 rounded-md">
                          More
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
          <div className="text-right mt-5">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={10}
              current={listOrderData?.meta?.currentPage || 1}
              pageSize={listOrderData?.meta?.itemsPerPage || 10}
              total={listOrderData?.meta?.totalItems || 10}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

History.Layout = withAuth(Layout);
