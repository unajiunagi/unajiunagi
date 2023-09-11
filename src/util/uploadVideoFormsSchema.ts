import { UseFormSetValue } from "react-hook-form";
import { StaffsType, VideoData } from "type/videoData";
import { numberForm } from "util/numberForm";
import { z } from "zod";

const nonEmptyArrayFilter = (value: string[]) => value.filter((item) => item !== ""); // 配列に空文字の要素があれば削除

// スキーマ
export const uploadVideoFormsSchema = z.object({
  title: z.string().nonempty("タイトルを入力してください。"),
  description: z.string().nonempty("あらすじを入力してください。"),
  birth_year: z.string().refine(numberForm, { message: "有効な数字を入力してください。" }),
  running_time: z.string().refine(numberForm, { message: "有効な数字を入力してください。" }),
  casts: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  directors: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  writers: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  cinematographers: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  sound_designers: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  lighting_designers: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  sound_recordists: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  music_directors: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  art_directors: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  editors: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
  producers: z.array(z.string()).default([]).transform(nonEmptyArrayFilter),
});

export type UploadVideoFormData = z.infer<typeof uploadVideoFormsSchema>;

// fornmDataのstaffのオブジェクトを返す
export const uploadVideoFormsStaffs = (formData: StaffsType) => {
  return {
    directors: formData.directors,
    writers: formData.writers,
    cinematographers: formData.cinematographers,
    sound_designers: formData.sound_designers,
    lighting_designers: formData.lighting_designers,
    sound_recordists: formData.sound_recordists,
    music_directors: formData.music_directors,
    art_directors: formData.art_directors,
    editors: formData.editors,
    producers: formData.producers,
  };
};

// formのデフォルト値をセット
export const uploadVideoFormDefaults = (data: VideoData | null, setValue: UseFormSetValue<UploadVideoFormData>) => {
  setValue("title", data?.title ?? "タイトル");
  setValue("description", data?.description ?? "あらすじ");
  setValue("birth_year", data?.birth_year?.toString() ?? "2000");
  setValue("running_time", data?.running_time?.toString() ?? "60");
  setValue("casts", data?.casts?.no_name ?? []);
  setValue("directors", data?.staffs?.directors ?? []);
  setValue("writers", data?.staffs?.writers ?? []);
  setValue("producers", data?.staffs?.producers ?? []);
  setValue("cinematographers", data?.staffs?.cinematographers ?? []);
  setValue("editors", data?.staffs?.editors ?? []);
  setValue("sound_designers", data?.staffs?.sound_designers ?? []);
  setValue("lighting_designers", data?.staffs?.lighting_designers ?? []);
  setValue("sound_recordists", data?.staffs?.sound_recordists ?? []);
  setValue("music_directors", data?.staffs?.music_directors ?? []);
  setValue("art_directors", data?.staffs?.art_directors ?? []);
  setValue("editors", data?.staffs?.editors ?? []);
  setValue("producers", data?.staffs?.producers ?? []);
};
