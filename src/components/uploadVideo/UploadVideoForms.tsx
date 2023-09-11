import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, FormControl, FormErrorMessage, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stack } from "@chakra-ui/react";
import { TextArrayForm } from "components/forms/TextArrayForm";
import { TextForm } from "components/forms/TextForm";
import { TextareaForm } from "components/forms/TextareaForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { VideoData } from "type/videoData";

type Props = {
  errors: FieldErrors<{
    title: string;
    description: string;
    birth_year: string;
    running_time: string;
    casts: string[];
    directors: string[];
    writers: string[];
    cinematographers: string[];
    sound_designers: string[];
    lighting_designers: string[];
    sound_recordists: string[];
    music_directors: string[];
    art_directors: string[];
    editors: string[];
    producers: string[];
  }>;
  register: UseFormRegister<any>;
  data: VideoData | null;
};

export const UploadVideoForms = ({ errors, register, data }: Props) => {
  return (
    <Stack spacing={1}>
      <TextForm formError={errors.title} register={register} id={"title"} label="タイトル" />
      <TextareaForm formError={errors.description} register={register} id={"description"} label="あらすじ" />
      <TextForm formError={errors.birth_year} register={register} id={"birth_year"} label="公開年(西暦)" helperText="西暦で入力してください。" />
      <TextForm formError={errors.running_time} register={register} id={"running_time"} label="上映時間(分)" helperText="分単位で入力してください。" />

      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <FormLabel>スタッフ</FormLabel>
            <Spacer />
            <AccordionIcon color={"white"} fontSize={"3xl"} />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <TextArrayForm formError={errors.directors} id="directors" label="監督" register={register} value={data?.staffs?.directors} />
            <TextArrayForm formError={errors.writers} id="writers" label="脚本" register={register} value={data?.staffs?.writers} />
            <TextArrayForm formError={errors.cinematographers} id="cinematographers" label="撮影" register={register} value={data?.staffs?.cinematographers} />
            <TextArrayForm formError={errors.sound_designers} id="sound_designers" label="音響" register={register} value={data?.staffs?.sound_designers} />
            <TextArrayForm formError={errors.lighting_designers} id="lighting_designers" label="照明" register={register} value={data?.staffs?.lighting_designers} />
            <TextArrayForm formError={errors.sound_recordists} id="sound_recordists" label="録音" register={register} value={data?.staffs?.sound_recordists} />
            <TextArrayForm formError={errors.music_directors} id="music_directors" label="音楽" register={register} value={data?.staffs?.music_directors} />
            <TextArrayForm formError={errors.art_directors} id="art_directors" label="美術" register={register} value={data?.staffs?.art_directors} />
            <TextArrayForm formError={errors.editors} id="editors" label="編集" register={register} value={data?.staffs?.editors} />
            <TextArrayForm formError={errors.producers} id="producers" label="プロデューサー" register={register} value={data?.staffs?.producers} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <FormLabel>キャスト</FormLabel>
            <Spacer />
            <AccordionIcon color={"white"} fontSize={"3xl"} />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <TextArrayForm formError={errors.casts} id="casts" label="" register={register} value={data?.casts?.no_name} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};
