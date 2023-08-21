import { StorageError } from "@supabase/storage-js";
import supabaseClient from "lib/supabase/supabaseClient";

export const uploadStorage = async (
  bucketName: string,
  pathName: string,
  file: File
): Promise<{
  url?: string;
  error?: StorageError;
}> => {
  // ファイルをストレージにアップロード
  const { data: pathData, error } = await supabaseClient.storage.from(bucketName).upload(pathName, file);
  if (error) return { error };
  // urlを取得
  const { data: urlData } = await supabaseClient.storage.from(bucketName).getPublicUrl(pathData.path);
  return { url: urlData.publicUrl };
};
