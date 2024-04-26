
export const getRandomPastelColor = () => {
  const baseRed = Math.floor(Math.random() * 256);
  const baseGreen = Math.floor(Math.random() * 256);
  const baseBlue = Math.floor(Math.random() * 256);

  // Смешивание с белым цветом для получения пастельного тона
  const red = Math.round((baseRed + 255) / 2);
  const green = Math.round((baseGreen + 255) / 2);
  const blue = Math.round((baseBlue + 255) / 2);

  return `rgb(${red}, ${green}, ${blue})`;
};
