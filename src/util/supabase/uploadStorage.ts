import supabaseClient from 'lib/supabase/supabaseClient';

export const uploadStorage = async (
  bucketName: string,
  pathName: string,
  file: File
): Promise<{
  url?: string;
  path?: string;
}> => {
  const { data: pathData, error } = await supabaseClient.storage.from(bucketName).upload(pathName, file); // ファイルをストレージにアップロード
  if (error) throw error;
  const { data: urlData } = await supabaseClient.storage.from(bucketName).getPublicUrl(pathData.path); // urlを取得
  return { path: pathData.path, url: urlData.publicUrl };
};
