export const wait = async (timeInSeconds) => {
  await new Promise((resolve) => setTimeout(resolve, timeInSeconds * 1000));
};

export const formatingTime = (timeInSeconds) => {
  return `${parseInt(timeInSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(timeInSeconds % 60).toString().padStart(2, "0")}`;
};

export const generarUUID = () => {
  let uuid = "";
  const caracteres = "abcdef0123456789";
  const longitud = caracteres.length;

  for (let i = 0; i < 32; i++) {
    const indice = Math.floor(Math.random() * longitud);
    uuid += caracteres[indice];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += "-";
    }
  }

  return uuid;
};
