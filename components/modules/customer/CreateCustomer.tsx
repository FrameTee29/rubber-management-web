import { FC, memo, useCallback, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCustomer } from "@libs/hooks/useCustomer";
import { RegisterCustomerForm } from "types/customer.type";
import { DarkGreenButton } from "@components/ui/Button";

const createCustomerDetailSchema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  address: yup.string().required("Please enter your address"),
  phone: yup.string().required("Please enter your phone"),
});

const CreateCustomer: FC = () => {
  const { registerCustomer } = useCustomer();

  const {
    getValues: getValuesOfCustomerDetail,
    register: registerCustomerDetail,
    handleSubmit: handleSubmitRegisterCustomerDetail,
    formState: { errors: errorsRegisterCustomerDetail },
  } = useForm<RegisterCustomerForm>({
    resolver: yupResolver(createCustomerDetailSchema),
  });

  const handleCustomerRegister = async () => {
    const form = {
      ...getValuesOfCustomerDetail(),
    } as RegisterCustomerForm;
    try {
      await registerCustomer(form);
    } catch (err) {
      console.log(err);
    }
  };

  const CustomerDetail = useCallback(() => {
    return (
      <>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Full name</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your full name"
            {...registerCustomerDetail("fullName")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterCustomerDetail.fullName && (
              <div className="text-red-600 text-xs">
                {errorsRegisterCustomerDetail.fullName?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Phone</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your phone"
            {...registerCustomerDetail("phone")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterCustomerDetail.phone && (
              <div className="text-red-600 text-xs">
                {errorsRegisterCustomerDetail.phone?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mb-2 space-y-2">
          <label className="font-semibold">Address</label>
          <input
            className="border px-2 py-2 rounded-md text-sm"
            placeholder="Your address"
            {...registerCustomerDetail("address")}
          ></input>
          <div className="w-full h-4">
            {errorsRegisterCustomerDetail.address && (
              <div className="text-red-600 text-xs">
                {errorsRegisterCustomerDetail.address?.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <DarkGreenButton
            onClick={handleSubmitRegisterCustomerDetail(handleCustomerRegister)}
          >
            NEXT
          </DarkGreenButton>
        </div>
      </>
    );
  }, [getValuesOfCustomerDetail("phone")]);

  return (
    <div>
      <CustomerDetail />
    </div>
  );
};

export default memo(CreateCustomer);
