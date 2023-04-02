import { ReactNode } from "react";
import { Header } from "components/common/Header";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
    </>
  );
};
