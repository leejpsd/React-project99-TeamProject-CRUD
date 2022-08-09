import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../styledcomponents/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Update from "../pages/Update";
import Test from "../pages/Test";

const Router = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/update" element={<Update />} />
            <Route path="/" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
export default Router;
