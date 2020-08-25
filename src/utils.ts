export const wait = (ms: number) => {
  if (ms < 1) {
    return;
  }
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};
