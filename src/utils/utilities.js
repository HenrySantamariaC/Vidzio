export const wait = async (timeInSeconds) => {
  await new Promise((resolve) => setTimeout(resolve, timeInSeconds * 1000));
};

export const formatingTime = (timeInSeconds) => {
  return `${parseInt(timeInSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(timeInSeconds % 60).toString().padStart(2, "0")}`;
};
