import { Box } from "@chakra-ui/react";
import { Footer } from "components/common/Footer";
import { Header } from "components/header/Header";
import { useWindowSize } from "hooks/useWindowSize";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: Props) => {
  const [height] = useWindowSize();

  return (
    <>
      <Header />
      <Box
        as="main"
        bgColor={"brand"}
        minHeight={height - 200}
        pb={16}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
