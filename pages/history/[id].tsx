import withAuth from "@libs/hoc/withAuth";
import { useCustomer } from "@libs/hooks/useCustomer";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { TOrder } from "types/order.type";

export default function CustomerHistory(props) {

  const { getCustomersSummary } = useCustomer();
  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    key: "phone",
    search: props.id,
  });
  const { data: listOrderData, refetch } = getCustomersSummary(meta);
  const [listOrder, setListOrder] = useState<TOrder[]>([]);
  console.log(listOrder);

  useEffect(() => {
    if (listOrderData) {
      setListOrder(listOrderData.items);
      setMeta(meta);
    }
  }, [listOrderData, props.id]);

  useEffect(() => {
    refetch();
  }, [meta]);

  return <div>{props.id}</div>;
}

CustomerHistory.Layout = withAuth(Layout);

export async function getServerSideProps(context: any) {
  const id = context.params.id;

  return {
    props: { data: id }, // will be passed to the page component as props
  };
}
