import { TMenuSidebar } from "types/menuSidebar";
import {
  ChartPieIcon,
  ClipboardListIcon,
  InboxInIcon,
  PrinterIcon,
  UsersIcon,
} from "@heroicons/react/solid";

export const MenuSidebar: TMenuSidebar[] = [
  {
    title: "Dashboard",
    icon: <ChartPieIcon />,
    href: "/",
  },
  {
    title: "Add Customer",
    icon: <UsersIcon />,
    href: "/customer",
  },
  {
    title: "Create Order",
    icon: <InboxInIcon />,
    href: "/order",
  },
  {
    title: "History",
    icon: <ClipboardListIcon />,
    href: "/history",
  },
  {
    title: "Bill",
    icon: <PrinterIcon />,
    href: "/bill",
  },
];
