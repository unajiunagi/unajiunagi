import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { UploadVideoComponent } from "components/creator/uploadVideo/UploadVideoComponent";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  formError: FieldError | undefined;
  register: UseFormRegister<any>;
  id: any;
  label?: string;
  placeholder?: string;
  helperText?: string;
};

export const PassForm = ({ formError, register, id, label, placeholder = "", helperText }: Props) => {
  return (
    <FormControl isInvalid={!!formError}>
      {label && (
        <FormLabel htmlFor={id} color="white">
          {label}
        </FormLabel>
      )}
      <Input id={id} type="password" placeholder={placeholder} {...register(id)} color="white" />
      {helperText && <FormHelperText color="white">{helperText}</FormHelperText>}
      <FormErrorMessage>{formError?.message}</FormErrorMessage>
    </FormControl>
  );
};
