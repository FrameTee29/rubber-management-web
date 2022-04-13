import Title from "antd/lib/typography/Title";

import withAuth from "@libs/hoc/withAuth";
import { Layout } from "@components/common/Layout";
import { useCallback, useState } from "react";

enum StateCreateOrder {
  SEARCH_CUSTOMER = "Search customer",
}

export default function Order() {
  const [stateCreateOrder, setStateCreateOrder] = useState<StateCreateOrder>(
    StateCreateOrder.SEARCH_CUSTOMER
  );

  const SearchCustomer = useCallback(() => {
    return <div></div>;
  }, []);

  return (
    <>
      <div className="w-full">
        <Title level={2}>
          <p className="text-dark-green-primary">Orders</p>
        </Title>
        <SearchCustomer />
      </div>
    </>
  );
}

Order.Layout = withAuth(Layout);
