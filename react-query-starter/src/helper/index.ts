export const calculatePagesCount = (
  pageSize: number,
  totalItemCount: number
) => {
  // We suppose that if we have 0 items we want 1 empty page
  return totalItemCount < pageSize ? 1 : Math.ceil(totalItemCount / pageSize);
};
