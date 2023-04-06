import { ReactNode } from "react";
import { Header } from "components/common/Header";
import { Footer } from "components/common/Footer";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
      <Footer />
    </>
  );
};
