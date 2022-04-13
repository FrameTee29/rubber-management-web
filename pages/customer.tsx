import { Layout } from "@components/common/Layout";
import CreateCustomer from "@components/modules/customer/CreateCustomer";
import withAuth from "@libs/hoc/withAuth";
import { useCustomer } from "@libs/hooks/useCustomer";
import { useEffect, useState } from "react";

export default function Customer() {
  const { getCustomers } = useCustomer();
  const { data, isLoading, refetch } = getCustomers({ page: 1, limit: 10 });
  
  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="flex w-full justify-around">
      <CreateCustomer />
      {isLoading ? <div>Loading...</div> : <div>Member</div>}
    </div>
  );
}

Customer.Layout = withAuth(Layout);
