export const calculateMaxPage = (totalResults, itemsPerPage) => {
  const baseMaxPage = Math.trunc(totalResults / itemsPerPage);
  if (totalResults % itemsPerPage) return baseMaxPage + 1;
  return baseMaxPage;
};
