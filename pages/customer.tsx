import * as yup from "yup";
import { Modal, Pagination } from "antd";
import { useForm } from "react-hook-form";
import Title from "antd/lib/typography/Title";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import withAuth from "@libs/hoc/withAuth";
import { RegisterCustomerForm, TCustomer } from "types/customer.type";
import { Layout } from "@components/common/Layout";
import { useCustomer } from "@libs/hooks/useCustomer";
import { DarkGreenButton, WhiteButton } from "@components/ui/Button";

enum StateCustomer {
  ADD_CUSTOMER = "Add customer",
  EDIT_CUSTOMER = "Edit customer",
}

const addMemberSchema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  phone: yup.string().required("Please enter your phone"),
  address: yup.string().required("Please enter your address"),
});
export default function Customer() {
  const { getCustomers, registerCustomer, updateCustomer } = useCustomer();

  const [state, setState] = useState<StateCustomer>(StateCustomer.ADD_CUSTOMER);
  const {
    getValues,
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCustomerForm>({
    resolver: yupResolver(addMemberSchema),
  });

  const [meta, setMeta] = useState({
    page: 1,
    limit: 10,
    key: "phone",
    search: "",
  });

  const { data: listCustomerData, refetch } = getCustomers(meta);
  const [customerId, setCustomerId] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

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

  const handleShowModalAddCustomer = () => {
    setState(StateCustomer.ADD_CUSTOMER);
    reset();
    showModal();
  };

  const handdleEditCustomer = (customer: TCustomer) => {
    setState(StateCustomer.EDIT_CUSTOMER);
    setValue("address", customer.address);
    setValue("fullName", customer.fullName);
    setValue("phone", customer.phone);
    setCustomerId(customer.id);
    showModal();
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
      handleCancel();
    } catch (error) {}
  };

  const handleUpdateCustomer = async () => {
    try {
      const form = { ...getValues(), id: customerId };
      await updateCustomer(form);
      refetch();
      handleCancel();
    } catch (err) {}
  };

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setMeta({ ...meta, page: 1, search: "" });
    }
    setSearch(e.target.value);
  };

  const handleChangePage = (page: number) => {
    setMeta({ ...meta, page });
  };

  const handleSearch = () => {
    setMeta({ ...meta, page: 1, search: String(search) });
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
          {state === StateCustomer.ADD_CUSTOMER && (
            <DarkGreenButton
              onClick={handleSubmit(handleAddCustomer)}
              className="w-full text-white"
            >
              ADD CUSTOMER
            </DarkGreenButton>
          )}
          {state === StateCustomer.EDIT_CUSTOMER && (
            <DarkGreenButton
              onClick={handleSubmit(handleUpdateCustomer)}
              className="w-full text-white"
            >
              SAVE
            </DarkGreenButton>
          )}
        </div>
      </div>
    );
  }, [getValues("address"), getValues("fullName"), getValues("phone")]);

  return (
    <>
      <Modal
        title={
          state === StateCustomer.ADD_CUSTOMER
            ? "Add customer"
            : "Edit customer"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <AddCustomerForm />
      </Modal>
      <div className="container mx-auto">
        <div className="w-full">
          <Title level={2}>
            <p className="text-dark-green-primary">Customers</p>
          </Title>
          <div className="text-left mb-8">
            <DarkGreenButton
              className="text-white"
              onClick={handleShowModalAddCustomer}
            >
              Add customer
            </DarkGreenButton>
          </div>
          <div className="mb-8">
            <input
              className=" px-2 py-2 rounded-md text-sm w-64 mr-3 border-dark-green-primary border-2"
              placeholder="Search with phone"
              onChange={handleSetSearch}
            ></input>
            <DarkGreenButton
              className="text-white"
              onClick={() => handleSearch()}
            >
              Search
            </DarkGreenButton>
          </div>
          <div className="grid grid-cols-6 w-full rounded  gap-4 text-white bg-dark-green-primary font-semibold px-1 py-2 border-2 border-dark-green-primary  text-base">
            <div className="text-center">ID</div>
            <div>Full Name</div>
            <div>Phone</div>
            <div className="">Address</div>
            <div className="text-center col-span-2">Action</div>
          </div>
          {listCustomer?.map((item) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-6 items-center rounded gap-4 border-2 w-full  border-dark-green-primary bg-cream-secondary my-2 font-medium py-1"
              >
                <div className="text-center">{item.id}</div>
                <div>{item.fullName}</div>
                <div>{item.phone}</div>
                <div className="truncate ">{item.address}</div>
                <div className="text-right">
                  <DarkGreenButton
                    className="text-white"
                    onClick={() => handdleEditCustomer(item)}
                  >
                    Edit
                  </DarkGreenButton>
                </div>
                <div className="text-left">
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
      </div>
    </>
  );
}

Customer.Layout = withAuth(Layout);
