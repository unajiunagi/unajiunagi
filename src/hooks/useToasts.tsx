import { useToast } from "@chakra-ui/react";

export const useToasts = () => {
  const sucessToast = useToast({ status: "success" });
  const infoToast = useToast({ status: "info" });
  const errorToast = useToast({ status: "error" });

  return {sucessToast, infoToast, errorToast}
};
