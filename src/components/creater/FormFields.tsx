import { Button, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { FormData } from "components/creater/UploadVideo";
import { useState } from "react";
import { FieldError, Merge, UseFormRegister } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

type roleNames = "casts" | "directors" | "screen_writers" | "cinematographers" | "sound_designers" | "lighting_designers" | "sound_designers" | "sound_recordists" | "music_directors" | "art_directors" | "editors" | "producers";

type Props = {
  roles: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  roleName: roleNames;
  labelName: string;
  register: UseFormRegister<FormData>;
};

export const FormFields = ({ roles, roleName, labelName, register }: Props) => {
  const [length, setLength] = useState<number>(1);

  const fields = [];

  for (let i = 0; i < length; i++) {
    const index = i;
    const fieldName: `${roleNames}.${number}` = `${roleName}.${index}`;

    fields.push(
      <FormControl key={index} isInvalid={!!roles?.[index]} pl={4} mb={2}>
        <HStack>
          <Input id={fieldName} type="text" {...register(fieldName)} color="white" />
          <Button color="blue" mr={3} onClick={() => setLength((prevLength) => prevLength + 1)}>
            <BsPlus />
          </Button>
        </HStack>
      </FormControl>
    );
  }

  return (
    <>
      <FormLabel color="white" pl={4}>
        {labelName}
      </FormLabel>
      {fields}
    </>
  );
};
