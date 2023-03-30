export const getChartWitdth = (length: number): number => {
  if (length < 10) {
    return 1280;
  }
  return 3500;
};