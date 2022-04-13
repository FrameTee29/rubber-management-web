import * as yup from "yup";
import { Modal, Pagination } from "antd";
import { useForm } from "react-hook-form";
import Title from "antd/lib/typography/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";

import withAuth from "@libs/hoc/withAuth";
import { RegisterCustomerForm, TCustomer } from "types/customer.type";
import { Layout } from "@components/common/Layout";
import { useCustomer } from "@libs/hooks/useCustomer";
import { DarkGreenButton } from "@components/ui/Button";

const addMemberSchema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  phone: yup.string().required("Please enter your phone"),
  address: yup.string().required("Please enter your address"),
});
export default function Customer() {
  const { getCustomers, registerCustomer } = useCustomer();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCustomerForm>({
    resolver: yupResolver(addMemberSchema),
  });

  const [meta, setMeta] = useState({ page: 1, limit: 10 });

  const { data: listCustomerData, refetch } = getCustomers(meta);

  const [listCustomer, setListCustomer] = useState<TCustomer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (listCustomerData) {
      setListCustomer(listCustomerData.items);
      setMeta(meta);
    }
  }, [listCustomerData]);

  useEffect(() => {
    refetch();
  }, [meta]);

  const handleAddCustomer = async (form: RegisterCustomerForm) => {
    try {
      await registerCustomer(form);
      refetch();
    } catch (error) {}
  };

  const handleChangePage = (page: number) => {
    setMeta({ ...meta, page });
  };

  const AddCustomerForm = useCallback(() => {
    return (
      <div>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Full name</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your full name"
            {...register("fullName")}
          ></input>
          <div className="w-full h-4">
            {errors.fullName && (
              <div className="text-red-600 text-xs">
                {errors.fullName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-4 space-y-2">
          <label className="font-semibold">Phone</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your phone"
            {...register("phone")}
          ></input>
          <div className="w-full h-4">
            {errors.phone && (
              <div className="text-red-600 text-xs">
                {errors.phone?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-4 space-y-2">
          <label className="font-semibold">Address</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your address"
            {...register("address")}
          ></input>
          <div className="w-full h-4">
            {errors.address && (
              <div className="text-red-600 text-xs">
                {errors.address?.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <DarkGreenButton
            onClick={handleSubmit(handleAddCustomer)}
            className="w-full"
          >
            ADD CUSTOMER
          </DarkGreenButton>
        </div>
      </div>
    );
  }, [getValues("address"), getValues("fullName"), getValues("phone")]);

  return (
    <>
      <Modal
        title="Add customer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <AddCustomerForm />
      </Modal>
      <div className="w-full">
        <Title level={2}>
          <p className="text-dark-green-primary">Customers</p>
        </Title>
        <div className="text-left mb-8">
          <DarkGreenButton onClick={showModal}>Add customer</DarkGreenButton>
        </div>
        <div className="grid grid-cols-6 w-full rounded 2xl:max-w-7xl gap-4 text-white bg-dark-green-primary font-semibold px-1 py-2 border-2 border-dark-green-primary  text-base">
          <div className="text-center">ID</div>
          <div>Full Name</div>
          <div>Phone</div>
          <div className="col-span-2">Address</div>
          <div className="text-center ">Action</div>
        </div>
        {listCustomer?.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-6 items-center rounded gap-4 border-2 w-full 2xl:max-w-7xl border-dark-green-primary bg-cream-secondary my-2 font-medium py-1"
            >
              <div className="text-center">{item.id}</div>
              <div>{item.fullName}</div>
              <div>{item.phone}</div>
              <div className="truncate col-span-2">{item.address}</div>
              <div className="text-center">
                <DarkGreenButton className="text-white">
                  Create Order
                </DarkGreenButton>
              </div>
            </div>
          );
        })}
        <div className="text-right mt-5">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={10}
            current={listCustomerData?.meta?.currentPage || 1}
            pageSize={listCustomerData?.meta?.itemsPerPage || 10}
            total={listCustomerData?.meta?.totalItems || 10}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
}

Customer.Layout = withAuth(Layout);
