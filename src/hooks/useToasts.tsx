import { useToast } from "@chakra-ui/react";

export const useToasts = () => {
  const successToast = useToast({ status: "success" });
  const infoToast = useToast({ status: "info" });
  const errorToast = useToast({ status: "error" });

  return {successToast, infoToast, errorToast}
};
