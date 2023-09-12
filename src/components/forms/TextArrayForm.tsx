import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError, Merge, UseFormRegister } from 'react-hook-form';
import { BsPlus } from 'react-icons/bs';

type Props = {
  formError: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  register: UseFormRegister<any>;
  id: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  value?: string[];
};

export const TextArrayForm = ({ formError, register, id, label, placeholder = '', helperText, value }: Props) => {
  const [length, setLength] = useState<number>(value?.length || 1);
  const fields = [];

  for (let i = 0; i < length; i++) {
    const fieldName: `${string}.${number}` = `${id}.${i}`;

    fields.push(
      <FormControl key={fieldName} isInvalid={!!formError?.[i]} pl={4} mb={2}>
        <HStack>
          <Input id={fieldName} type='text' placeholder={placeholder} {...register(fieldName)} />
          <Button color='facebook' mr={3} onClick={() => setLength((prevLength) => prevLength + 1)}>
            <BsPlus color='black' size='24' />
          </Button>
        </HStack>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <FormErrorMessage>{formError?.[i]?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  return (
    <>
      {label && <FormLabel pl={4}>{label}</FormLabel>}
      {fields}
    </>
  );
};
