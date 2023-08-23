import { Button, FormLabel, ModalBody, ModalFooter, chakra, useBoolean } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { UploadThumbnailImg } from "components/creater/UploadThumbnailImg";
import { UploadVideoComponent } from "components/creater/UploadVideoComponent";
import { TextArrayForm } from "components/forms/TextArrayForm";
import { TextForm } from "components/forms/TextForm";
import { TextareaForm } from "components/forms/TextareaForm";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcherDefault } from "util/fetcherDefault";
import { numberForm } from "util/numberForm";
import { v4 } from "uuid";
import { z } from "zod";

// 配列に空文字の要素があれば削除
const nonEmptyArrayFilter = (value: string[]) => value.filter((item) => item !== "");

const schema = z.object({
  title: z.string().nonempty("タイトルを入力してください。"),
  description: z.string().nonempty("あらすじを入力してください。"),
  birth_year: z.string().refine(numberForm, { message: "有効な数字を入力してください。" }),
  running_time: z.string().refine(numberForm, { message: "有効な数字を入力してください。" }).default("0"),
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

type FormData = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
  id: string | null;
};

export const UploadVideoForms = ({ onClose, id }: Props) => {
  const user = useUser();
  const [videoId, setVideoId] = useState<string | null>(id);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [isCancel, setIsCancel] = useBoolean(false);
  const { sucessToast, errorToast } = useToasts();
  const { data, error } = useSWR(`api/supabase/getVideo/${id}`, fetcherDefault);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // const getVideoData = async () => {
    //   if (videoId) {
    //     const { data, error } = await supabaseClient.from("videos").select("*").eq("id", videoId).single();
    //     if (error) throw error;
    //     if (data) {
    //       setThumbnailUrl(data.thumbnail_url);
    //       setVideoId(data.id);
    //     }
    //   }
    // };
    // getVideoData();
  }, [data]);

  const uploadDatabase = async (data: FormData) => {
    setisLoading(true);

    const casts = { no_name: data.casts };
    const staffs = {
      directors: data.directors,
      writers: data.writers,
      cinematographers: data.cinematographers,
      sound_designers: data.sound_designers,
      lighting_designers: data.lighting_designers,
      sound_recordists: data.sound_recordists,
      music_directors: data.music_directors,
      art_directors: data.art_directors,
      editors: data.editors,
      producers: data.producers,
    };
    try {
      if (videoId) {
        const { error } = await supabaseClient
          .from("videos")
          .update({ title: data.title, description: data.description, creater_id: user?.id, thumbnail_url: thumbnailUrl, birth_year: Number(data.birth_year), running_time: Number(data.running_time), casts, staffs })
          .eq("id", videoId);
        if (error) throw error;
      } else {
        const id = v4();
        const { error } = await supabaseClient.from("videos").insert({ id, title: data.title, description: data.description, creater_id: user?.id, thumbnail_url: thumbnailUrl, birth_year: data.birth_year, running_time: data.running_time, casts, staffs });
        if (error) throw error;
        setVideoId(id);
      }
      sucessToast({ title: "情報が保存されました。" });
      if (isCancel) onClose();
    } catch (e) {
      errorToast({ title: "エラーが発生しました。情報が保存されませんでした。" });
    } finally {
      setisLoading(false);
      if (isCancel) setIsCancel.off();
    }
  };

  return (
    <>
      <chakra.form width="100%" onSubmit={handleSubmit(uploadDatabase)} overflowY="scroll">
        <ModalBody>
          <UploadThumbnailImg setThumbnailUrl={setThumbnailUrl} />
          <UploadVideoComponent />

          <TextForm formError={formState.errors.title} register={register} id={"title"} label="タイトル" />
          <TextareaForm formError={formState.errors.description} register={register} id={"description"} label="あらすじ" />
          <TextForm formError={formState.errors.birth_year} register={register} id={"birth_year"} label="公開年(西暦)" helperText="西暦で入力してください。" />
          <TextForm formError={formState.errors.running_time} register={register} id={"running_time"} label="上映時間(分)" helperText="分単位で入力してください。" />

          <FormLabel color="white">スタッフ</FormLabel>
          <TextArrayForm formError={formState.errors.directors} id="directors" label="監督" register={register} />
          <TextArrayForm formError={formState.errors.writers} id="writers" label="脚本" register={register} />
          <TextArrayForm formError={formState.errors.cinematographers} id="cinematographers" label="撮影" register={register} />
          <TextArrayForm formError={formState.errors.sound_designers} id="sound_designers" label="音響" register={register} />
          <TextArrayForm formError={formState.errors.lighting_designers} id="lighting_designers" label="照明" register={register} />
          <TextArrayForm formError={formState.errors.sound_recordists} id="sound_recordists" label="録音" register={register} />
          <TextArrayForm formError={formState.errors.music_directors} id="music_directors" label="音楽" register={register} />
          <TextArrayForm formError={formState.errors.art_directors} id="art_directors" label="美術" register={register} />
          <TextArrayForm formError={formState.errors.editors} id="editors" label="編集" register={register} />
          <TextArrayForm formError={formState.errors.producers} id="producers" label="プロデューサー" register={register} />

          <FormLabel color="white">キャスト</FormLabel>
          <TextArrayForm formError={formState.errors.casts} id="casts" label="" register={register} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
            保存
          </Button>
          <Button type="submit" onClick={setIsCancel.on}>
            Cancel
          </Button>
        </ModalFooter>
      </chakra.form>
    </>
  );
};
