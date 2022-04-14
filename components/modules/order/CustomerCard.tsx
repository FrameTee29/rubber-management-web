import { UserIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { TCustomer } from "types/customer.type";

export type TCustomerCard = {
  customer: TCustomer;
  showButton?: boolean;
  onCreateOrder: (value: TCustomer) => void;
};

const CustomerCard: FC<TCustomerCard> = ({
  customer,
  onCreateOrder,
  showButton = true,
}) => {
  return (
    <div className=" bg-cream-secondary px-2 py-3 rounded-md border-2 border-dark-green-primary">
      <div className="flex items-end mb-2 text-lg font-bold bg-cream-primary px-2 rounded-md">
        <div className="">No.</div>
        <div className="">{customer.id}</div>
      </div>
      <div className="flex flex-col justify-center items-center mb-3">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-dark-green-primary">
          <UserIcon className="text-cream-primary w-10"></UserIcon>
        </div>
        <span className="text-base mt-2 font-semibold">
          {customer.fullName}
        </span>
      </div>
      <div className="mt-3">
        <span className="text-dark-green-primary font-bold">Phone : </span>{" "}
        <span className="font-medium">{customer.phone}</span>
      </div>
      <div>
        <span className="truncate-3line font-medium">{customer.address}</span>
      </div>
      {showButton && (
        <div className="mt-3">
          <button
            className="w-full font-bold bg-dark-green-primary text-white py-1 rounded-md"
            onClick={() => onCreateOrder(customer)}
          >
            Create order
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
