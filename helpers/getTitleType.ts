import filterFields from "../data/filterFields.json";

export const getTitleLabel = (type: string): string => {
  let titleLabel: string;

  const itemType = filterFields.find((item) => item.value === type);

  if (itemType && itemType.value !== 'All') {
    titleLabel = itemType.label;
  } else {
    titleLabel = "Posts";
  }

  return titleLabel;
};
