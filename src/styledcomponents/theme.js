const pixelToRem = (size) => `${size / 16}rem`;

const fontSizes = {
  title: pixelToRem(60),
  subtitle: pixelToRem(30),
  nickname: pixelToRem(25),
};

const colors = {
  black: "#000000",
  white: "#ffffff",
};

const common = {
  flexCenter: `
    display:flex;
    justify-contents: center;
    align-items: center;
    `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;
