export const numberForm = (value: string): boolean => {
  // 先頭の0があると8進数として解釈されるので0を削除
  const newValue = value.replace(/^0+/, "");
  // numberに変換出来ないならNaNが返る。全角数字は半角に変換される
  const numValue = Number(newValue);
  // Number("") === 0　になるので、0はfalseにする
  return !isNaN(numValue) && numValue !== 0;
}
