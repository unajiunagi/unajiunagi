export const checkFileSize = (files: FileList, size: number): boolean => {
  const result = false;
  // ファイルサイズはMB単位で整数で指定
  const limitSize = 1024 * 1024 * size;
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > limitSize) return true;
  }
  // ファイルが指定のサイズ以上ならtrueを返す
  return result;
};
