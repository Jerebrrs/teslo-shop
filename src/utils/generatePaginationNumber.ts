export const generationPaginationNumbers = (
  currentPage: number,
  totalpage: number
) => {
  if (totalpage <= 6) {
    return Array.from({ length: totalpage }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalpage - 1, totalpage];
  }

  if (currentPage >= totalpage - 2) {
    return [1, 2, "...", totalpage - 2, totalpage - 1, totalpage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalpage,
  ];
};
