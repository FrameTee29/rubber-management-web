import Title from "antd/lib/typography/Title";

import withAuth from "@libs/hoc/withAuth";
import { Layout } from "@components/common/Layout";

export default function Order() {
  return (
    <>
      <div className="w-full">
        <Title level={2}>
          <p className="text-dark-green-primary">Orders</p>
        </Title>
      </div>
    </>
  );
}

Order.Layout = withAuth(Layout);
