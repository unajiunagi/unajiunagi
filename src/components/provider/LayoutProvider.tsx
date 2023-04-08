import { Box } from "@chakra-ui/react";
import { Footer } from "components/common/Footer";
import { Header } from "components/common/Header";
import { ReactNode } from "react";
import { useWindowSize } from "react-use";

type Props = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: Props) => {
  const { height } = useWindowSize();

  return (
    <>
      <Header />
      <Box className="layout" minHeight={`${height}px`} pb={16}>
        {children}
      </Box>
      <Footer />
    </>
  );
};
