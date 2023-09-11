import { useToast } from "@chakra-ui/react";

export const useToasts = () => {
  const successToast = useToast({ status: "success", isClosable: true, position: "top", duration: 2000 });
  const infoToast = useToast({ status: "info", isClosable: true, position: "top", duration: 2000 });
  const errorToast = useToast({ status: "error", isClosable: true, position: "top", duration: 2000 });

  return {successToast, infoToast, errorToast}
};
