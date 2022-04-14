import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Title from "antd/lib/typography/Title";

import withAuth from "@libs/hoc/withAuth";
import { Layout } from "@components/common/Layout";
import { DarkGreenButton } from "@components/ui/Button";
import CustomerCard from "@components/modules/order/CustomerCard";
import { useCustomer } from "@libs/hooks/useCustomer";
import { TCustomer } from "types/customer.type";
import { useOrder } from "@libs/hooks/useOrder";
import { CreateOrderForm } from "types/order.type";
import Swal from "sweetalert2";

enum StateCreateOrder {
  SEARCH_CUSTOMER = "Search customer",
  CREATE_ORDER = "Create Order",
}

enum StateSearchCustomer {
  NO_SEARCH = "No search",
  SEARCHING = "Searching",
  HAS_CUSTOMER = "Has customer",
}

enum StateInputPricePerUnit {
  INVALID = "invalid",
  HAVE_VALUE = "Have value",
}

export default function Order() {
  const { getCustomers } = useCustomer();
  const { createOrder } = useOrder();

  // State for Query
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({
    page: 1,
    limit: 99999,
    key: "phone",
    search: "no",
  });

  const { data: listCustomerData, refetch } = getCustomers(meta);

  // State of UI
  const [stateCreateOrder, setStateCreateOrder] = useState<StateCreateOrder>(
    StateCreateOrder.SEARCH_CUSTOMER
  );
  const [stateSearchCustomer, setStateSearchCustomer] =
    useState<StateSearchCustomer>(StateSearchCustomer.NO_SEARCH);
  const [stateInputPricePerUnit, setStateInputPricePerUnit] =
    useState<StateInputPricePerUnit>(StateInputPricePerUnit.INVALID);

  // Data
  const [listCustomer, setListCustomer] = useState<TCustomer[]>([]);
  const [customer, setCustomer] = useState<TCustomer>({
    id: 0,
    fullName: "",
    address: "",
    phone: "",
  });

  // Variable
  const [confirmPricePerUnit, setConfirmPricePerUnit] =
    useState<boolean>(false);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [enterWeight, setEnterWeight] = useState<any>("undefined");
  const [listWeight, setListWeight] = useState<number[]>([]);
  const [employerRatio, setEmployerRatio] = useState<any>(100);
  const [employeeRatio, setEmployeeRatio] = useState<any>(0);

  useEffect(() => {
    if (listCustomerData) {
      setListCustomer(listCustomerData.items);
      setMeta(meta);
    }
  }, [listCustomerData]);

  useEffect(() => {
    refetch();
  }, [meta]);

  const totalWeight = useMemo(() => {
    return listWeight?.reduce((prev, current) => prev + current, 0);
  }, [listWeight]);

  const totalPrice = useMemo(() => {
    return totalWeight * pricePerUnit;
  }, [totalWeight, pricePerUnit]);

  const priceOfEmployer = useMemo(() => {
    return totalPrice * (employerRatio / 100);
  }, [employeeRatio, totalPrice, pricePerUnit]);

  const priceOfEmployee = useMemo(() => {
    return totalPrice * (employeeRatio / 100);
  }, [employerRatio, totalPrice, pricePerUnit]);

  const handleSetSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setMeta({ ...meta, page: 1, search: "no" });
      setStateSearchCustomer(StateSearchCustomer.NO_SEARCH);
    }
    setSearch(e.target.value);
  };

  const handleSearchCustomer = () => {
    setStateSearchCustomer(StateSearchCustomer.SEARCHING);
    setMeta({ ...meta, page: 1, search: String(search) });
  };

  const handleSelectCustomer = (value: TCustomer) => {
    setCustomer(value);
    setStateSearchCustomer(StateSearchCustomer.HAS_CUSTOMER);
    setStateCreateOrder(StateCreateOrder.CREATE_ORDER);
  };

  const handleConfirmPricePerUnit = () => {
    setConfirmPricePerUnit(true);
    setStateInputPricePerUnit(StateInputPricePerUnit.HAVE_VALUE);
  };

  const handleEditPricePerUnit = () => {
    setConfirmPricePerUnit(false);
    setStateInputPricePerUnit(StateInputPricePerUnit.HAVE_VALUE);
  };

  const handleAddWeightToList = () => {
    if (enterWeight) {
      setListWeight([...listWeight, enterWeight]);
    }
    setEnterWeight("");
  };

  const handleSetEmployerPercentage = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployerRatio(Number(e.target.value));
    setEmployeeRatio(100 - Number(e.target.value));
  };

  const handleSetEmployeePercentage = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeRatio(Number(e.target.value));
    setEmployerRatio(100 - Number(e.target.value));
  };

  const handleCreateOrder = async () => {
    try {
      if (!confirmPricePerUnit) {
        Swal.fire({ icon: "warning", text: "Please confirm unit price." });
      } else if (listWeight.length === 0) {
        Swal.fire({ icon: "warning", text: "Please enter the weight." });
      } else {
        const form = {
          pricePerUnit: pricePerUnit,
          phone: customer.phone,
          orderItems: listWeight,
          employer: priceOfEmployer,
          employee: priceOfEmployee,
        } as CreateOrderForm;

        await createOrder(form);
        location.reload();
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="container mx-auto">
        <Title level={2}>
          <p className="text-dark-green-primary">Orders</p>
        </Title>
        {/* Step. 1 select the customer */}
        <section>
          <div className="">
            <div className="text-dark-green-primary mb-2">
              <span className="text-black text-lg font-medium">Step 1.</span>{" "}
              <span className="text-sm">Select the customer for the order</span>
            </div>
            {(stateSearchCustomer === StateSearchCustomer.NO_SEARCH ||
              stateSearchCustomer === StateSearchCustomer.SEARCHING) && (
              <div>
                <input
                  className="px-2 py-2 rounded-md text-sm w-64 mr-3 border-dark-green-primary border-2"
                  placeholder="Search ( phone )"
                  onChange={handleSetSearch}
                ></input>
                <DarkGreenButton
                  className="text-white"
                  onClick={handleSearchCustomer}
                >
                  Search
                </DarkGreenButton>
              </div>
            )}
            {/* Searching  */}
            {stateSearchCustomer === StateSearchCustomer.SEARCHING && (
              <div>
                <div className="text-dark-green-primary my-2">
                  <span className="text-black text-base font-bold">
                    Customer list
                  </span>{" "}
                </div>
                {listCustomer.length > 0 ? (
                  <div className="grid grid-cols-5 gap-6">
                    {listCustomer?.map((item) => {
                      return (
                        <CustomerCard
                          customer={item}
                          onCreateOrder={handleSelectCustomer}
                          key={item.id}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full text-center border rounded-md py-4 border-gray-300 bg-gray-100 text-gray-400 text-lg">
                    Not found{" "}
                  </div>
                )}
              </div>
            )}
            {/* Customer */}
            {stateSearchCustomer === StateSearchCustomer.HAS_CUSTOMER && (
              <div className="grid grid-cols-5">
                <CustomerCard
                  customer={customer}
                  onCreateOrder={() => {}}
                  showButton={false}
                />
              </div>
            )}
          </div>
        </section>

        {/* Step.2 Create Order */}
        <section>
          {stateCreateOrder === StateCreateOrder.CREATE_ORDER && (
            <>
              {/* Input price per unit first. */}
              <div className="mt-8 flex justify-between items-center">
                <div className="">
                  <div className="text-dark-green-primary mb-2">
                    <span className="text-black text-lg font-medium">
                      Step 2.
                    </span>{" "}
                    <span className="text-sm">
                      Fill in the information to create an order.
                    </span>
                  </div>
                  <div className="mb-4">
                    <div>Enter the unit price.</div>
                    <input
                      disabled={confirmPricePerUnit}
                      className={`px-2 py-2 rounded-md text-sm w-64 mr-3  border-2 ${
                        confirmPricePerUnit
                          ? "bg-gray-100 cursor-not-allowed"
                          : "border-dark-green-primary"
                      }`}
                      placeholder="THB / kg"
                      onChange={(e) => setPricePerUnit(Number(e.target.value))}
                    ></input>
                    {confirmPricePerUnit ? (
                      <DarkGreenButton
                        className="text-white"
                        onClick={handleEditPricePerUnit}
                      >
                        Edit
                      </DarkGreenButton>
                    ) : (
                      <DarkGreenButton
                        className="text-white"
                        onClick={handleConfirmPricePerUnit}
                      >
                        Confirm
                      </DarkGreenButton>
                    )}
                  </div>
                </div>
                {stateCreateOrder === StateCreateOrder.CREATE_ORDER &&
                  stateInputPricePerUnit ===
                    StateInputPricePerUnit.HAVE_VALUE && (
                    <div className="text-right text-white">
                      <DarkGreenButton onClick={handleCreateOrder}>
                        Create Order
                      </DarkGreenButton>
                    </div>
                  )}
              </div>

              {/* After input price per unit will showing important detail */}
              {stateInputPricePerUnit === StateInputPricePerUnit.HAVE_VALUE && (
                <div className="grid grid-cols-5 gap-10 my-10">
                  {/* Price per unit */}
                  <div className="border-2 rounded-md px-4 py-4 border-dark-green-primary text-center">
                    <div className="font-semibold text-dark-green-secondary mb-2 text-lg">
                      Price per Unit
                    </div>
                    <div className={"text-3xl font-bold text-green-600 "}>
                      {pricePerUnit || 0}
                    </div>
                    <div className="font-semibold mt-2">THB/kg</div>
                  </div>

                  {/* Weight total */}
                  <div className="border-2 rounded-md px-4 py-4 border-dark-green-primary text-center">
                    <div className="font-semibold text-black mb-2 text-lg">
                      Total weight
                    </div>
                    <div className={"text-3xl font-bold text-yellow-400 "}>
                      {totalWeight}
                    </div>
                    <div className="font-semibold mt-2">kg</div>
                  </div>

                  {/* Total price */}
                  <div className="border-2 rounded-md px-4 py-4 border-dark-green-primary text-center">
                    <div className="font-semibold text-black mb-2 text-lg">
                      Total price
                    </div>
                    <div className={"text-3xl font-bold text-blue-400 "}>
                      {totalPrice}
                    </div>
                    <div className="font-semibold mt-2">THB</div>
                  </div>
                </div>
              )}

              {/* Fill information */}
              {stateInputPricePerUnit === StateInputPricePerUnit.HAVE_VALUE && (
                <div className="grid grid-cols-6 mt-4  gap-10">
                  {/* Enter Weight */}
                  <div className="flex flex-col">
                    <div>Enter the weight.</div>
                    <input
                      type="number"
                      value={enterWeight}
                      className="px-2 py-2 rounded-md text-sm w-full mr-3 border-dark-green-primary border-2"
                      placeholder="Weight ( kg. )"
                      onChange={(e) => setEnterWeight(Number(e.target.value))}
                    ></input>
                    <button
                      className="text-white bg-dark-green-primary h-8 rounded-md mt-3"
                      onClick={handleAddWeightToList}
                    >
                      Enter
                    </button>
                  </div>

                  {/* Show list weight */}
                  <div className="flex flex-col border-2 border-dark-green-primary col-span-2 rounded p-1">
                    <div className="grid grid-cols-3 gap-2 bg-dark-green-primary w-full px-1  py-2 rounded text-white font-semibold text-base">
                      <div className="text-center">#</div>
                      <div className="text-center col-span-2">
                        Weight ( kg .)
                      </div>
                    </div>
                    {listWeight?.length === 0 && (
                      <div className="flex w-full h-full items-center justify-center">
                        No item
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-2 w-full px-1  py-2">
                      {listWeight?.map((item, index) => {
                        return (
                          <div
                            key={item}
                            className="grid grid-cols-3 gap-2 w-full px-1  py-2 rounded text-dark-green-primary font-semibold text-base border-b"
                          >
                            <div className="text-center">{index + 1}</div>
                            <div className="text-center col-span-2">{item}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ration between employer to employee */}
                  <div className="border-2 px-1 pt-2 rounded border-dark-green-primary h-48">
                    <div className="text-lg font-semibold mb-2 bg-dark-green-primary text-white px-2 py-1 rounded">
                      Ratio ( % )
                    </div>
                    <div className="mb-2 px-2">
                      <div>Employer</div>
                      <input
                        max={101}
                        type="number"
                        value={employerRatio}
                        className="px-2 py-2 rounded-md text-sm w-full mr-3 border-dark-green-primary border-2"
                        placeholder="%"
                        onChange={handleSetEmployerPercentage}
                      ></input>
                    </div>
                    <div className="mb-2 px-2">
                      <div>Employee</div>
                      <input
                        max={101}
                        type="number"
                        value={employeeRatio}
                        className="px-2 py-2 rounded-md text-sm w-full mr-3 border-dark-green-primary border-2"
                        placeholder="%"
                        onChange={handleSetEmployeePercentage}
                      ></input>
                    </div>
                  </div>

                  {/* Display amount of employer  */}
                  <div className="flex flex-col justify-center items-center space-y-4 border-dark-green-primary border-2 rounded h-48">
                    <div className="font-semibold">
                      The employer will receive
                    </div>
                    <div className="text-blue-500 font-bold text-lg">
                      {priceOfEmployer}
                    </div>
                    <div className="font-bold">THB</div>
                  </div>

                  {/* Display amount of employee */}
                  <div className="flex flex-col justify-center items-center space-y-4 border-dark-green-primary border-2 rounded h-48">
                    <div className="font-semibold">
                      The employee will receive
                    </div>
                    <div className="text-blue-500 font-bold text-lg">
                      {priceOfEmployee}
                    </div>
                    <div className="font-bold">THB</div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

Order.Layout = withAuth(Layout);
