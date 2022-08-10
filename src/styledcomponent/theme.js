import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  bgColor: "#7884fb",
  textColor: "#fff",
  borderColor: "1px solid #7884fb",
};

export const darkTheme = {
  bgColor: "#1e1e22",
  textColor: "#ccc",
  borderColor: "1px solid #2c2d33",
};

export const theme = {
  darkTheme,
  lightTheme,
};

export const GlobalStyles = createGlobalStyle`
  body{
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.color};
    border:${(props) => props.theme.borderColor};
  }
`;
