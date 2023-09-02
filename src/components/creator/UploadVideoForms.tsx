import { FormLabel } from "@chakra-ui/react";
import { TextArrayForm } from "components/forms/TextArrayForm";
import { TextForm } from "components/forms/TextForm";
import { TextareaForm } from "components/forms/TextareaForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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
};

export const UploadVideoForms = ({ errors, register }: Props) => {
  return (
    <>
      <TextForm formError={errors.title} register={register} id={"title"} label="タイトル" />
      <TextareaForm formError={errors.description} register={register} id={"description"} label="あらすじ" />
      <TextForm formError={errors.birth_year} register={register} id={"birth_year"} label="公開年(西暦)" helperText="西暦で入力してください。" />
      <TextForm formError={errors.running_time} register={register} id={"running_time"} label="上映時間(分)" helperText="分単位で入力してください。" />

      <FormLabel color="white">スタッフ</FormLabel>
      <TextArrayForm formError={errors.directors} id="directors" label="監督" register={register} />
      <TextArrayForm formError={errors.writers} id="writers" label="脚本" register={register} />
      <TextArrayForm formError={errors.cinematographers} id="cinematographers" label="撮影" register={register} />
      <TextArrayForm formError={errors.sound_designers} id="sound_designers" label="音響" register={register} />
      <TextArrayForm formError={errors.lighting_designers} id="lighting_designers" label="照明" register={register} />
      <TextArrayForm formError={errors.sound_recordists} id="sound_recordists" label="録音" register={register} />
      <TextArrayForm formError={errors.music_directors} id="music_directors" label="音楽" register={register} />
      <TextArrayForm formError={errors.art_directors} id="art_directors" label="美術" register={register} />
      <TextArrayForm formError={errors.editors} id="editors" label="編集" register={register} />
      <TextArrayForm formError={errors.producers} id="producers" label="プロデューサー" register={register} />

      <FormLabel color="white">キャスト</FormLabel>
      <TextArrayForm formError={errors.casts} id="casts" label="" register={register} />
    </>
  );
};
