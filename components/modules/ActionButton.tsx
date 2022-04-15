import { DarkGreenButton } from "@components/ui/Button";
import React from "react";
import ReactToPrint from "react-to-print";

type ActionButtonProps = {
  componentToPrint: React.MutableRefObject<null>;
};

export const ActionButton = (props: ActionButtonProps) => {
  const { componentToPrint } = props;
  const marginTop = "10px";
  const marginRight = "5px";
  const marginBottom = "10px";
  const marginLeft = "5px";

  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };
  return (
    <>
      <ReactToPrint
        pageStyle={`@page {
          size: A4;
          margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;
        }`}
        trigger={() => <DarkGreenButton className="text-white" id={"print"}> {"Print"} </DarkGreenButton>}
        content={() => componentToPrint.current}
      />
    </>
  );
};
