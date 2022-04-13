import { Layout } from "@components/common/Layout";
import withAuth from "@libs/hoc/withAuth";

export default function Index() {
  return <h1 className="">First page</h1>;
}

Index.Layout = withAuth(Layout);
