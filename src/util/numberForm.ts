type Props = {
  min?: number;
  max?: number;
};

export const numberForm = (value: string, config: Props = { min: 0, max: 2147483647 }): boolean => {
  if (value === '') return false; // 空文字ならfalseを返す
  const newValue = value.replace(/^0+/, ''); // 先頭に0があると8進数として解釈されるので先頭の0を削除
  const numValue = Number(newValue); // numberに変換出来ないならNaNになる。全角数字は半角に変換される
  // min以上
  if (config?.min !== undefined && config?.max !== undefined) return numValue >= config?.min && numValue <= config?.max; // NaNでなく、min以上max以下ならtrueを返す
  return !Number.isNaN(numValue);
};

