import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  formError: FieldError | undefined;
  register: UseFormRegister<any>;
  id: any;
  label?: string;
  placeholder?: string;
  helperText?: string;
};

export const TextareaForm = ({ formError, register, id, label, placeholder = "", helperText }: Props) => {
  return (
    <FormControl isInvalid={!!formError}>
      {label && (
        <FormLabel htmlFor={id} color="white">
          {label}
        </FormLabel>
      )}
      <Textarea id={id} placeholder={placeholder} {...register(id)} color="white" />
      {helperText && <FormHelperText color="white">{helperText}</FormHelperText>}
      <FormErrorMessage>{formError?.message}</FormErrorMessage>
    </FormControl>
  );
};
