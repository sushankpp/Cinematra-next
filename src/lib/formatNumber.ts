export const formatNumber = (num: number) => {
  const safeNum = Number.isFinite(num) ? num : 0;
  const formatted = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(safeNum);

  return `${formatted} ${safeNum === 1 ? "follower" : "followers"}`;
};
