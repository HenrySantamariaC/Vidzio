export const wait = async (timeInSeconds) => {
  await new Promise((resolve) => setTimeout(resolve, timeInSeconds * 1000));
};
